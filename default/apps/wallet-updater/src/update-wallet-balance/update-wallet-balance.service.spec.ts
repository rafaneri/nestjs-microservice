import { Test, TestingModule } from '@nestjs/testing';
import { UpdateWalletBalanceService } from './update-wallet-balance.service';
import { EventType, TransactionType, Wallet } from '@wallet/domain';
import { RepositoryService } from '@wallet/repository';
import { generateRandomAccount } from '../../../utils/utils';

describe('UpdateWalletBalanceService', () => {
  let service: UpdateWalletBalanceService;
  let repository: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateWalletBalanceService, RepositoryService],
    }).compile();

    service = module.get<UpdateWalletBalanceService>(
      UpdateWalletBalanceService,
    );
    repository = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update wallet balance correctly for CREDIT transaction', async () => {
    const code = generateRandomAccount(10);
    const wallet = await repository
      .getRepository(Wallet)
      .create({ code, balance: 100 });
    const transaction = {
      wallet: wallet,
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 200,
      description: 'PIX received',
      timestamp: new Date().getTime(),
    };

    await service.updateBalance(wallet, transaction);

    const updated = await repository.getRepository(Wallet).findOne({ code });

    expect(updated.balance).toBe(300);
  });
});
