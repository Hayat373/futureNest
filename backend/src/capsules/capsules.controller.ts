// src/capsules/capsule.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { CapsuleService } from './capsules.service';
import { Capsule } from './entitiy/capsule.entitiy';
import { CreateCapsuleDto } from './dto/create-capsule.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('capsules')
export class CapsuleController {
  constructor(private readonly capsuleService: CapsuleService) {}

   @Post()
    @UseInterceptors(FilesInterceptor('files')) // Expecting 'files' as the field name
    async create(@Body() createCapsuleDto: CreateCapsuleDto, @UploadedFiles() files: Express.Multer.File[]) {
        // Process uploaded files here if necessary
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