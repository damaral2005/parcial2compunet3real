import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { Program } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProgramController],
  // TODO Reto 1: registra la entidad Program con TypeORM
  
  // TODO Reto 4: importa lo necesario para poder usar @Auth() en el controlador
  imports: [
    TypeOrmModule.forFeature([Program])
  ],
  providers: [ProgramService],
})
export class ProgramModule {}
