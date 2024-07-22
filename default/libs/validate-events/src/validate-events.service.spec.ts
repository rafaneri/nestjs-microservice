import { Test, TestingModule } from '@nestjs/testing';
import { ValidateEventsService } from './validate-events.service';
import { RepositoryModule } from '@wallet/repository';

describe('ValidateEventsService', () => {
  let service: ValidateEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      providers: [ValidateEventsService],
    }).compile();

    service = module.get<ValidateEventsService>(ValidateEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
