
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capsule } from './entitiy/capsule.entitiy';
import { CreateCapsuleDto } from './dto/create-capsule.dto';

@Injectable()
export class CapsuleService {
  constructor(
    @InjectRepository(Capsule)
    private capsuleRepository: Repository<Capsule>,
  ) {}

  async create(capsuleData: CreateCapsuleDto): Promise<Capsule> {
  const capsule = this.capsuleRepository.create({
    ...capsuleData,
    unlockDateTime: new Date(capsuleData.unlockDateTime), // Convert to Date object
  });
  return await this.capsuleRepository.save(capsule);
}

  async findAll(): Promise<Capsule[]> {
    return await this.capsuleRepository.find();
  }

  async findOne(id: number): Promise<Capsule> {
  return await this.capsuleRepository.findOneOrFail({ where: { id } });
}
}