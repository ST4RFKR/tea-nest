import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequesr {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почта пользователя',
  })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта не должна быть пустой' })
  @IsEmail({}, { message: 'Некорректная почта' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Пароль пользователя',
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не должно быть пустой' })
  @Length(6, 20, { message: 'Пароль должен быть от 6 до 20 символов' })
  password: string;
}
