import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Capsule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  textMessage: string; // Text message

  @Column({ nullable: true })
  textFile: string; // URL or path to the text file (PDF, etc.)

  @Column({ nullable: true })
  image: string; // URL or path to the image

  @Column()
  unlockDateTime: Date; // Date & time to unlock the capsule

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdDateTime: Date; // Capsule creation date & time
}