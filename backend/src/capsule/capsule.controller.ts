import { Controller, Post, Body, Get } from '@nestjs/common';
import { CapsuleService } from './capsule.service';

@Controller('capsules')
export class CapsuleController {
  constructor(private readonly capsuleService: CapsuleService) {}

  @Post()
  async create(@Body() capsuleData: { title: string; description: string; date: Date; file?: string; image?: string }) {
    return this.capsuleService.createCapsule(capsuleData);
  }

  @Get()
  async findAll() {
    return this.capsuleService.findAll();
  }
}