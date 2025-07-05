// src/capsules/capsule.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CapsuleService } from './capsules.service';
import { Capsule } from './entitiy/capsule.entitiy';
import { CreateCapsuleDto } from './dto/create-capsule.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('capsules')
export class CapsuleController {
  constructor(private readonly capsuleService: CapsuleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Directory for file uploads
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4(); // Generate a unique filename
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(
    @Body() createCapsuleDto: CreateCapsuleDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Capsule> {
    if (file) {
      if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
        createCapsuleDto.textFile = file.path; // Save the file path
      } else {
        throw new Error('Invalid file type. Only PDFs and images are allowed.');
      }
    }
    return this.capsuleService.create(createCapsuleDto);
  }

  @Get()
  async findAll(): Promise<Capsule[]> {
    return this.capsuleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Capsule> {
    return this.capsuleService.findOne(id);
  }
}