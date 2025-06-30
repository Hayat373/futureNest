import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapsuleController } from './capsule.controller';
import { CapsuleService } from './capsule.service';
import { Capsule } from './entitiy/capsule.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Capsule])],
  controllers: [CapsuleController],
  providers: [CapsuleService],
})
export class CapsuleModule {}