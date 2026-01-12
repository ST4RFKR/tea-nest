import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequesr } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt.interface';
import { LoginRequesr } from './dto/login.dto';
import type { Response, Request } from 'express';
import { isDev } from 'utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );

    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }
  async register(res: Response, dto: RegisterRequesr) {
    const { email, password, name } = dto;
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: await hash(password),
        name,
      },
    });
    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequesr) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword = await verify(user.password, password);
    if (!isValidPassword) {
      throw new NotFoundException('Пользователь не найден');
    }
    return this.auth(res, user.id);
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
    return true;
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Не действительный рефреш токен');
    }
    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: { id: true },
      });
      if (!user) {
        throw new UnauthorizedException('Не действительный рефреш токен');
      }
      return this.auth(res, user.id);
    }
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24),
    );
    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL as any,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL as any,
    });
    return { accessToken, refreshToken };
  }
  private setCookie(res: Response, value: string, exp: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires: exp,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'lax' : 'none',
    });
  }
}
