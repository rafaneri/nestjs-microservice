import { Injectable } from '@nestjs/common';
import { TransactionEventDto } from '@wallet/domain';
import { UpdateBalanceRepository } from './update-balance.repository';

@Injectable()
export class UpdateBalanceService {
  constructor(readonly repository: UpdateBalanceRepository) {}
  updateBalance(transaction: TransactionEventDto) {
    this.repository.updateBalance(transaction);
  }
}
