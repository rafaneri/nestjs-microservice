import { Module } from '@nestjs/common';
import { WalletUpdaterController } from './wallet-updater.controller';
import { WalletUpdaterService } from './wallet-updater.service';
import { SummarizeTransactionsService } from './summarize-transactions/summarize-transactions.service';
import { ManageTransactionService } from './manage-transaction/manage-transaction.service';
import { UpdateWalletBalanceService } from './update-wallet-balance/update-wallet-balance.service';
import { RepositoryModule } from '@wallet/repository';
import { ValidateEventsModule } from '@wallet/validate-events';

@Module({
  imports: [RepositoryModule, ValidateEventsModule],
  controllers: [WalletUpdaterController],
  providers: [
    WalletUpdaterService,
    SummarizeTransactionsService,
    ManageTransactionService,
    UpdateWalletBalanceService,
  ],
})
export class WalletUpdaterModule {}
