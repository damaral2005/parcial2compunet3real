import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class AssignStudentsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  studentIds: string[];
}
