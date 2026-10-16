import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ProgramService } from './program.service';
import { BulkCreateProgramDto } from './dto/bulk-create-program.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { ProgramPaginationDto } from './dto/program-pagination.dto';
import { Auth } from '../user/decorators/auth.decorator';
import { GetUser } from '../user/decorators/get-user.decorator';
import { ValidRoles } from '../user/enums/valid-roles.enum';
import { User } from '../user/entities/user.entity';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(
    @Body() createProgramDto: CreateProgramDto,
    @GetUser() user: User,
  ) {
    return this.programService.create(createProgramDto, user);
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
  @Auth(ValidRoles.admin)
  assignStudents(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() assignStudentsDto: AssignStudentsDto,
  ) {
    return this.programService.assignStudents(id, assignStudentsDto);
  }

  @Post('bulk')
  @Auth(ValidRoles.admin)
  bulkCreate(
    @Body() bulkCreateProgramDto: BulkCreateProgramDto,
    @GetUser() user: User,
  ) {
    return this.programService.bulkCreate(bulkCreateProgramDto, user);
  }
}
