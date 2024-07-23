import { Injectable } from '@nestjs/common';
import { Transaction, Wallet } from '@wallet/domain';
import { MongoRepository, RepositoryService } from '@wallet/repository';

@Injectable()
export class UpdateWalletBalanceService {
  private repository: MongoRepository<Wallet>;

  constructor(readonly service: RepositoryService) {
    this.repository = service.getRepository(Wallet);
  }

  async updateBalance(wallet: Wallet, transaction: Transaction) {
    const update = { $inc: { balance: transaction.amount * transaction.type } };
    await this.repository.updateOne({ _id: wallet._id }, update);
  }
}
