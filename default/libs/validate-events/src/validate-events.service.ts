import { Injectable } from '@nestjs/common';
import { Transaction, TransactionEventDto, Wallet } from '@wallet/domain';
import { MongoRepository, RepositoryService } from '@wallet/repository';

interface TransactionValidateStatus {
  status: boolean;
  wallet?: Wallet;
}

@Injectable()
export class ValidateEventsService {
  private transactionRepository: MongoRepository<Transaction>;
  private walletRepository: MongoRepository<Wallet>;

  constructor(readonly service: RepositoryService) {
    this.transactionRepository = service.getRepository(Transaction);
    this.walletRepository = service.getRepository(Wallet);
  }

  async canTransact(
    transaction: TransactionEventDto,
  ): Promise<TransactionValidateStatus> {
    const wallet = await this.walletRepository.findOne({
      code: transaction.wallet,
    });
    if (!wallet) {
      return { status: false };
    } else {
      const result = await this.transactionRepository.findOne({
        timestamp: transaction.timestamp,
        event: transaction.event,
        type: transaction.type,
        amount: transaction.amount,
        'wallet.code': wallet.code,
      });

      return { status: result ? false : true, wallet };
    }
  }
}
