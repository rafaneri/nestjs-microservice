import { Test, TestingModule } from '@nestjs/testing';
import { WalletUpdaterController } from './wallet-updater.controller';
import { WalletUpdaterService } from './wallet-updater.service';
import {
  TransactionEventDto,
  TransactionType,
  EventType,
} from '@wallet/domain';
import { UpdateWalletBalanceService } from './update-wallet-balance/update-wallet-balance.service';
import { ValidateEventsService } from '@wallet/validate-events';
import { ManageTransactionService } from './manage-transaction/manage-transaction.service';
import { RepositoryModule } from '@wallet/repository';
import { generateRandomAccount } from '../../utils/utils';
import { SummarizeTransactionsService } from './summarize-transactions/summarize-transactions.service';

describe('WalletUpdaterController', () => {
  let walletUpdaterController: WalletUpdaterController;
  let validateEventsService: ValidateEventsService;
  let updateWalletBalanceService: UpdateWalletBalanceService;
  let manageTransactionService: ManageTransactionService;
  let summarizeTransactionsService: SummarizeTransactionsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      controllers: [WalletUpdaterController],
      providers: [
        WalletUpdaterService,
        ValidateEventsService,
        UpdateWalletBalanceService,
        ManageTransactionService,
        SummarizeTransactionsService,
      ],
    }).compile();

    walletUpdaterController = app.get<WalletUpdaterController>(
      WalletUpdaterController,
    );
    validateEventsService = app.get<ValidateEventsService>(
      ValidateEventsService,
    );
    updateWalletBalanceService = app.get<UpdateWalletBalanceService>(
      UpdateWalletBalanceService,
    );
    manageTransactionService = app.get<ManageTransactionService>(
      ManageTransactionService,
    );
    summarizeTransactionsService = app.get<SummarizeTransactionsService>(
      SummarizeTransactionsService,
    );
  });

  it('should be defined', () => {
    expect(walletUpdaterController).toBeDefined();
  });

  it('should handle updateBalance with the correct arguments', async () => {
    const code = generateRandomAccount(10);
    const walletUpdaterService = {
      materializeData: jest.fn(),
      updateWalletBalanceService,
      validateEventsService,
      manageTransactionService,
      summarizeTransactionsService,
    };
    const controller = new WalletUpdaterController(walletUpdaterService);
    const timestamp = new Date().getTime();
    const transaction: TransactionEventDto = {
      wallet: code,
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      description: 'Deposit internet bank',
      timestamp,
    };
    controller.materializeData(transaction);
    expect(walletUpdaterService.materializeData).toHaveBeenCalledWith(
      transaction,
    );
  });
});
