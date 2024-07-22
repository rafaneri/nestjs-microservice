import { TestingModule, Test } from '@nestjs/testing';
import { GetBalanceRepository } from './get-balance.repository';
import { MongoRepository, RepositoryModule } from '@wallet/repository';
import { Wallet } from '@wallet/domain';
import { generateRandomAccount } from '../../../jest.setup';

describe('GetBalanceRepository', () => {
  let service: GetBalanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      providers: [GetBalanceRepository],
    }).compile();

    service = module.get<GetBalanceRepository>(GetBalanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return balance 0 when wallet not exists', async () => {
    const walletCode = 'inexisting_wallet';
    const balance = await service.getBalance(walletCode);

    expect(balance).toBe(0);
  });

  it('should return balance when wallet exists', async () => {
    const walletCode = generateRandomAccount(10);
    const repository = new MongoRepository(Wallet);
    await repository.create({ code: walletCode, balance: 100 });
    const balance = await service.getBalance(walletCode);

    expect(balance).toBe(100);
  });
});
