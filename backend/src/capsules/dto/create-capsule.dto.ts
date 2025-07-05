import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateCapsuleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  textMessage?: string; // Text message

  @IsOptional()
  textFile?: string; // URL or path to the text file

  @IsOptional()
  image?: string; // URL or path to the image

  @IsNotEmpty()
  @IsDateString() // Validate as a string date
  unlockDateTime: string;  // Date & time to unlock the capsule
}