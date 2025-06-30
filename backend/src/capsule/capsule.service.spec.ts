import { Test, TestingModule } from '@nestjs/testing';
import { CapsuleService } from './capsule.service';

describe('CapsuleService', () => {
  let service: CapsuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapsuleService],
    }).compile();

    service = module.get<CapsuleService>(CapsuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
