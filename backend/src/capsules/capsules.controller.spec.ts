import { Test, TestingModule } from '@nestjs/testing';
import { CapsulesController } from './capsules.controller';

describe('CapsulesController', () => {
  let controller: CapsulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapsulesController],
    }).compile();

    controller = module.get<CapsulesController>(CapsulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
