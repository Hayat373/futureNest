import { Test, TestingModule } from '@nestjs/testing';
import { CapsulesService } from './capsules.service';

describe('CapsulesService', () => {
  let service: CapsulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapsulesService],
    }).compile();

    service = module.get<CapsulesService>(CapsulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
