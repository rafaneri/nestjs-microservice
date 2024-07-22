import { Injectable } from '@nestjs/common';
import { Transaction, Wallet } from '@wallet/domain';
import { MongoRepository, RepositoryService } from '@wallet/repository';

@Injectable()
export class ManageTransactionService {
  private transactionRepository: MongoRepository<Transaction>;
  private walletRepository: MongoRepository<Wallet>;

  constructor(readonly service: RepositoryService) {
    this.transactionRepository = service.getRepository(Transaction);
    this.walletRepository = service.getRepository(Wallet);
  }

  async manageTransaction(transaction: Transaction) {
    this.transactionRepository.create(transaction);
  }
}
