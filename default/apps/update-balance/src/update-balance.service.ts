import { Injectable } from '@nestjs/common';
import { TransactionEventDtoInterface } from '@wallet/domain';

@Injectable()
export class UpdateBalanceService {
  updateBalance(transaction: TransactionEventDtoInterface) {
    console.log(transaction);
  }
}
