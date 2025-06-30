import { Test, TestingModule } from '@nestjs/testing';
import { CapsuleController } from './capsule.controller';

describe('CapsuleController', () => {
  let controller: CapsuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapsuleController],
    }).compile();

    controller = module.get<CapsuleController>(CapsuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
