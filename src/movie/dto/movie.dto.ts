import {
  IsArray,
  IsBoolean,
  isBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsBoolean()
  isPublic: boolean;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];

  @IsOptional()
  @IsString()
  imageUrl: string;
}
