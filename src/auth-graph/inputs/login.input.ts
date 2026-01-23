import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType({ description: 'Данные для входа пользователя' })
export class LoginInput {
  @Field(() => String, { description: 'Почта пользователя' })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта не должна быть пустой' })
  @IsEmail({}, { message: 'Некорректная почта' })
  email: string;

  @Field(() => String, { description: 'Пароль пользователя' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не должно быть пустой' })
  @Length(6, 20, { message: 'Пароль должен быть от 6 до 20 символов' })
  password: string;
}
