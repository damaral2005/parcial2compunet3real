import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Program]), UserModule],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
