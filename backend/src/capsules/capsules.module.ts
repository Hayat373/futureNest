
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capsule } from './entitiy/capsule.entitiy';
import { CapsuleService } from './capsules.service';
import { CapsuleController } from './capsules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Capsule])],
  controllers: [CapsuleController],
  providers: [CapsuleService],
})
export class CapsuleModule {}