import { Injectable } from '@nestjs/common';
import { SummarizedBalance, Transaction, Wallet } from '@wallet/domain';
import { MongoRepository, RepositoryService } from '@wallet/repository';
import moment from 'moment';

@Injectable()
export class SummarizeTransactionsService {
  private sumarizedBallanceRepository: MongoRepository<SummarizedBalance>;
  private walletRepository: MongoRepository<Wallet>;

  constructor(readonly service: RepositoryService) {
    this.sumarizedBallanceRepository = service.getRepository(SummarizedBalance);
    this.walletRepository = service.getRepository(Wallet);
  }

  async summarizeTransaction(wallet: Wallet, transaction: Transaction) {
    const date = moment(transaction.timestamp).format('YYYY-MM-DD');
    const updateFilter = { wallet: wallet._id, date };
    const update = { $inc: { balance: transaction.amount * transaction.type } };
    await this.sumarizedBallanceRepository.updateOne(updateFilter, update);
    const lastSummaries = await this.sumarizedBallanceRepository.findAll(
      {
        wallet: wallet._id,
      },
      {},
      3,
      { date: -1 },
    );
    await this.walletRepository.update(wallet._id, {
      sumarizedBallance: lastSummaries,
    });
  }
}
