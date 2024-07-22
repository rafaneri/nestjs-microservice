import { Injectable } from '@nestjs/common';
import { Transaction, TransactionType, Wallet } from '@wallet/domain';
import { MongoRepository, RepositoryService } from '@wallet/repository';

@Injectable()
export class UpdateWalletBalanceService {
  private repository: MongoRepository<Wallet>;

  constructor(readonly service: RepositoryService) {
    this.repository = service.getRepository(Wallet);
  }

  async updateBalance(wallet: Wallet, transaction: Transaction) {
    const balance = wallet.balance;
    switch (transaction.type) {
      case TransactionType.DEBIT:
        wallet.balance -= transaction.amount;
        break;
      case TransactionType.CREDIT:
        wallet.balance += transaction.amount;
        break;
    }
    if (balance !== wallet.balance) {
      await this.repository.update(wallet._id, wallet);
    }
  }
}
