import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType({ description: 'Данные для регистрации пользователя' })
export class RegisterInput {
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

  @Field(() => String, { description: 'Имя пользователя' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не должно быть пустой' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  name: string;
}
