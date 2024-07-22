import { Injectable } from '@nestjs/common';
import { TransactionEvent, TransactionEventDto } from '@wallet/domain';
import { MongoRepository, RepositoryService } from '@wallet/repository';

@Injectable()
export class UpdateBalanceRepository {
  private repository: MongoRepository<TransactionEvent>;

  constructor(readonly service: RepositoryService) {
    this.repository = service.getRepository(TransactionEvent);
  }

  async updateBalance(transaction: TransactionEventDto) {
    return this.repository.create(transaction);
  }
}
