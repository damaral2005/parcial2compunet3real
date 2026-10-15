import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity('program')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column('int')
  credits: number;

  @OneToMany(() => Student, (student) => student.program)
  students?: Student[];

  // TODO Reto 4: relacion con el usuario que crea el programa.
}
