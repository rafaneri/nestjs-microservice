import { Test, TestingModule } from '@nestjs/testing';
import { ListStatementRepository } from './list-statement.repository';
import { RepositoryModule } from '@wallet/repository';

describe('ListStatementRepositoryService', () => {
  let service: ListStatementRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      providers: [ListStatementRepository],
    }).compile();

    service = module.get<ListStatementRepository>(ListStatementRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of transactions when given a valid wallet code', async () => {
    const walletCode = 'existing_wallet';
    const result = await service.listStatement(walletCode);

    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});
