import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  HOME = 'study',
  LEARNING = 'home',
}
export class CreateTaskDto {
  @IsString({ message: 'Профиль должен быть строкой' })
  @IsNotEmpty({ message: 'Профиль не должен быть пустым' })
  @Length(3, 20, { message: 'Профиль должен быть от 3 до 20 символов' })
  title: string;

  @IsString({ message: 'Профиль должен быть строкой' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Приоритет должен быть целым числом' })
  @IsOptional()
  @IsPositive({ message: 'Приоритет должен быть положительным числом' })
  priority: number;

  @IsArray({ message: 'Тэги должны быть массивом' })
  @IsEnum(TaskTag, {
    each: true,
    message: `Тэги должны быть валидными значениями`,
  })
  @IsOptional()
  tags: TaskTag[];

  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(3, 20, { message: 'Пароль должен быть от 3 до 20 символов' })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message:
      'Пароль должен содержать хотя бы одну заглавную букву и одну цифру',
  })
  password: string;

  @IsUrl(
    { protocols: ['http', 'https'] },
    { message: 'Ссылка должна быть валидной' },
  )
  @IsOptional()
  webSiteUrl: string;
}
