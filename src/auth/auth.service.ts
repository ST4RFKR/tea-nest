import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequesr } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt.interface';
import { StringValue } from 'ms';
import { LoginRequesr } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string; // Исправлено: TOKET -> TOKEN
  private readonly JWT_REFRESH_TOKEN_TTL: string; // Исправлено: TOKET -> TOKEN

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }
  async register(dto: RegisterRequesr) {
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
    return this.generateTokens(user.id);
  }

  async login(dto: LoginRequesr) {
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
    return this.generateTokens(user.id);
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
      secure: true,
      sameSite: 'none',
      expires: exp,
    });
  }
}
