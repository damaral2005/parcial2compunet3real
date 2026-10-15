import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsObject, ValidateNested } from 'class-validator';
import { CreateProgramDto } from './create-program.dto';

export class BulkCreateProgramDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CreateProgramDto)
  programs: CreateProgramDto[];
}
