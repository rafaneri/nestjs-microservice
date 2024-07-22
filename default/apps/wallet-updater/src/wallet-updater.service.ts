import { Injectable } from '@nestjs/common';
import { Transaction, TransactionEventDto } from '@wallet/domain';
import { UpdateWalletBalanceService } from './update-wallet-balance/update-wallet-balance.service';
import { ValidateEventsService } from '@wallet/validate-events';
import { ManageTransactionService } from './manage-transaction/manage-transaction.service';
import { SummarizeTransactionsService } from './summarize-transactions/summarize-transactions.service';

@Injectable()
export class WalletUpdaterService {
  constructor(
    readonly validateEventsService: ValidateEventsService,
    readonly updateWalletBalanceService: UpdateWalletBalanceService,
    readonly manageTransactionService: ManageTransactionService,
    readonly summarizeTransactionsService: SummarizeTransactionsService,
  ) {}

  async materializeData(transaction: TransactionEventDto) {
    const canTransact =
      await this.validateEventsService.canTransact(transaction);
    // Poderia ter utilizado um emissor de eventos para notificar o que uma transação válida chegou
    if (canTransact.status) {
      const data: Transaction = {
        wallet: canTransact.wallet,
        type: transaction.type,
        event: transaction.event,
        description: transaction.description,
        amount: transaction.amount,
        timestamp: transaction.timestamp,
        reference: transaction.reference,
      };
      await this.updateWalletBalanceService.updateBalance(
        canTransact.wallet,
        data,
      );
      await this.manageTransactionService.manageTransaction(data);
      await this.summarizeTransactionsService.summarizeTransaction(
        canTransact.wallet,
        data,
      );
    }
  }
}
