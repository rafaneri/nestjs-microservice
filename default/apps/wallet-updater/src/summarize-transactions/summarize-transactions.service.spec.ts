import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeTransactionsService } from './summarize-transactions.service';
import { RepositoryService } from '@wallet/repository';
import { TransactionType, EventType, Wallet } from '@wallet/domain';
import { generateRandomAccount } from '../../../../jest.setup';

describe('SummarizeTransactionsService', () => {
  let service: SummarizeTransactionsService;
  let repository: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummarizeTransactionsService, RepositoryService],
    }).compile();

    service = module.get<SummarizeTransactionsService>(
      SummarizeTransactionsService,
    );
    repository = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have one day summary', async () => {
    const code = generateRandomAccount(10);
    const timestamp = 1721462689890;
    let wallet = await repository
      .getRepository(Wallet)
      .create({ code, balance: 100 });

    await service.summarizeTransaction(wallet, {
      wallet,
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 200,
      description: 'Deposit internet bank',
      timestamp,
    });

    await service.summarizeTransaction(wallet, {
      wallet,
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 400,
      description: 'Deposit internet bank',
      timestamp: new Date().getTime(),
    });

    await service.summarizeTransaction(wallet, {
      wallet,
      type: TransactionType.DEBIT,
      event: EventType.SHOPPING,
      amount: 130,
      description: 'Deposit internet bank',
      timestamp: new Date().getTime(),
    });

    wallet = await repository.getRepository(Wallet).findOne({ code });

    expect(wallet.sumarizedBallance.length).toEqual(2);
    expect(wallet.sumarizedBallance[0].balance).toEqual(270);
    expect(wallet.sumarizedBallance[1].balance).toEqual(200);
  });
});
