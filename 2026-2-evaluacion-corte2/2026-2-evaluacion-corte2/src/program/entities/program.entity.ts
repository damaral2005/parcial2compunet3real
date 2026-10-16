import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  createdBy?: User | null;
}
