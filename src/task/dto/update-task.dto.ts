import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Профиль должен быть строкой' })
  @IsNotEmpty({ message: 'Профиль не должен быть пустым' })
  @Length(3, 20, { message: 'Профиль должен быть от 3 до 20 символов' })
  title: string;
  @IsBoolean({ message: 'Профиль должен быть boolean типом' })
  isCompleted: boolean;
}
