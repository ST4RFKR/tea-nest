import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequesr } from './dto/register.dto';
import { LoginRequesr } from './dto/login.dto';
import type { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Регистрация пользователя',
    description: 'Создает нового пользователя',
  })
  @ApiBadRequestResponse({
    description: 'Некорректные данные',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @ApiConflictResponse({
    description: 'Пользователь с такой почтой уже существует',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequesr,
  ) {
    return this.authService.register(res, dto);
  }
  @ApiOperation({
    summary: 'Вход пользователя',
    description: 'Авторизация пользователя и выдача токенов',
  })
  @ApiBadRequestResponse({
    description: 'Некорректные данные',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не найден',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequesr,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Обновления токенов',
    description: 'Обновление токенов и выдача новых токенов',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Не действительный рефреш токен',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }
  @ApiOperation({
    summary: 'Выход пользователя',
    description: 'Выход пользователя и удаление токенов',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
