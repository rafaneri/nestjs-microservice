import { Injectable } from '@nestjs/common';
import { MongoRepository, RepositoryService } from '@wallet/repository';
import { Wallet } from '@wallet/domain';

@Injectable()
export class GetBalanceRepository {
  private repository: MongoRepository<Wallet>;
  constructor(readonly service: RepositoryService) {
    this.repository = service.getRepository(Wallet);
  }
  async getBalance(wallet: string): Promise<number> {
    let entity = await this.repository.findOne({ code: wallet });
    if (!entity) {
      entity = await this.repository.create({ code: wallet, balance: 0 });
    }
    return entity.balance;
  }
}
