import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationDto } from '../../student/dto/pagination.dto';

export class ProgramPaginationDto extends OmitType(PaginationDto, ['skip'] as const) {
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number;
}
