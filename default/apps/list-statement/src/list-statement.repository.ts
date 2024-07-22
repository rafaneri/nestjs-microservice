import { Injectable } from '@nestjs/common';
import { Transaction } from '@wallet/domain';
import { MongoRepository, RepositoryService } from '@wallet/repository';

@Injectable()
export class ListStatementRepository {
  private repository: MongoRepository<Transaction>;

  constructor(readonly service: RepositoryService) {
    this.repository = service.getRepository(Transaction);
  }

  async listStatement(wallet: string): Promise<Transaction[]> {
    return this.repository.findAll({ code: wallet });
  }
}
