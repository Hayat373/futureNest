import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Capsule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  file: string;

  @Column({ nullable: true })
  image: string;
}