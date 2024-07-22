import { Test, TestingModule } from '@nestjs/testing';
import { ManageTransactionService } from './manage-transaction.service';
import {
  EventType,
  Transaction,
  TransactionType,
  Wallet,
} from '@wallet/domain';
import { RepositoryService } from '@wallet/repository';
import { generateRandomAccount } from '../../../../jest.setup';

describe('ManageTransactionService', () => {
  let service: ManageTransactionService;
  let repository: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageTransactionService, RepositoryService],
    }).compile();

    service = module.get<ManageTransactionService>(ManageTransactionService);
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
    const timestamp = new Date().getTime();
    const transaction = {
      wallet: wallet,
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 200,
      description: 'Deposit internet bank',
      timestamp,
    };

    await service.manageTransaction(transaction);

    const savedTransaction = await repository
      .getRepository(Transaction)
      .findOne({ timestamp });

    expect(savedTransaction).toBeDefined();
  });
});
