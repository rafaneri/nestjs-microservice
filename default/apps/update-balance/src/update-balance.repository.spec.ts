import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBalanceRepository } from './update-balance.repository';
import { EventType, TransactionType, Wallet } from '@wallet/domain';
import { RepositoryModule, RepositoryService } from '@wallet/repository';
import { generateRandomAccount } from '../../../jest.setup';

describe('UpdateBalanceRepositoryService', () => {
  let service: UpdateBalanceRepository;
  let repository: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      providers: [UpdateBalanceRepository, RepositoryService],
    }).compile();

    service = module.get<UpdateBalanceRepository>(UpdateBalanceRepository);
    repository = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction and return new data with _id', async () => {
    const code = generateRandomAccount(10);
    await repository.getRepository(Wallet).create({ code, balance: 0 });
    const transaction = {
      wallet: code,
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      description: 'Deposit internet bank',
      amount: 20,
      timestamp: new Date().getTime(),
    };
    const result = await service.updateBalance(transaction);

    expect(result._id).toBeDefined();
  });
});
