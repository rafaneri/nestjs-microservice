import { Injectable } from '@nestjs/common';
import { TransactionInterface } from '@wallet/domain';
import { ListStatementRepository } from './list-statement.repository';

@Injectable()
export class ListStatementService {
  constructor(readonly repository: ListStatementRepository) {}
  listStatement(wallet: string): Promise<TransactionInterface[]> {
    return this.repository.listStatement(wallet);
  }
}
