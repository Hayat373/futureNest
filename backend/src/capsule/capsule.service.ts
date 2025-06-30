import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capsule } from './entitiy/capsule.entitiy';

@Injectable()
export class CapsuleService {
  constructor(
    @InjectRepository(Capsule)
    private capsuleRepository: Repository<Capsule>,
  ) {}

  async createCapsule(data: Partial<Capsule>) {
    const capsule = this.capsuleRepository.create(data);
    return await this.capsuleRepository.save(capsule);
  }

  async findAll() {
    return this.capsuleRepository.find();
  }
}