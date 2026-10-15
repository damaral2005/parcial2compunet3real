import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ProgramService } from './program.service';
import { BulkCreateProgramDto } from './dto/bulk-create-program.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { ProgramPaginationDto } from './dto/program-pagination.dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.create(createProgramDto);
  }

  @Get()
  findAll(@Query() paginationDto: ProgramPaginationDto) {
    return this.programService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.programService.findOne(id);
  }

  @Patch(':id/students')
  assignStudents(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() assignStudentsDto: AssignStudentsDto,
  ) {
    return this.programService.assignStudents(id, assignStudentsDto);
  }

  @Post('bulk')
  bulkCreate(@Body() bulkCreateProgramDto: BulkCreateProgramDto) {
    return this.programService.bulkCreate(bulkCreateProgramDto);
  }
  // TODO Reto 4: autenticacion y autorizacion.
}
