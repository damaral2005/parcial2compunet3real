import { IsInt, IsPositive, IsString, Matches, MinLength } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @Matches(/^[A-Z]{3,6}$/)
  code: string;

  @IsInt()
  @IsPositive()
  credits: number;
}
