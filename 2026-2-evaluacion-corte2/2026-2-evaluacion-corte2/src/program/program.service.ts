import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Student } from '../student/entities/student.entity';
import { PaginationDto } from '../student/dto/pagination.dto';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    try {
      const program = this.programRepository.create(createProgramDto);
      return await this.programRepository.save(program);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('Ya existe un programa con ese nombre o codigo');
      }
      throw error;
    }
  }

  findAll(paginationDto: PaginationDto): Promise<Program[]> {
    const { limit = 5, skip = 0 } = paginationDto;
    return this.programRepository.find({
      take: limit,
      skip,
      order: { id: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: { students: true },
    });
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
    return program;
  }

  async assignStudents(id: string, assignStudentsDto: AssignStudentsDto): Promise<Program> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const program = await queryRunner.manager.findOne(Program, {
        where: { id },
        relations: { students: true },
      });
      if (!program) {
        throw new NotFoundException(`Program with id ${id} not found`);
      }

      const students = new Map(
        (program.students ?? []).map((student) => [student.id.toLowerCase(), student]),
      );
      for (const studentId of assignStudentsDto.studentIds) {
        const key = studentId.toLowerCase();
        if (students.has(key)) continue;

        const student = await queryRunner.manager.findOneBy(Student, { id: studentId });
        if (!student) {
          throw new NotFoundException(`Student with id ${studentId} not found`);
        }
        students.set(key, student);
      }

      program.students = [...students.values()];
      await queryRunner.manager.save(program);

      const result = await queryRunner.manager.findOne(Program, {
        where: { id },
        relations: { students: true },
      });
      if (!result) {
        throw new NotFoundException(`Program with id ${id} not found`);
      }

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // TODO Reto 3: creacion en lote.
}
