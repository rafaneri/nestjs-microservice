import { Injectable } from '@nestjs/common';
import {
  EventType,
  TransactionInterface,
  TransactionType,
} from '@wallet/domain';

@Injectable()
export class ListStatementService {
  listStatement(wallet: string): TransactionInterface[] {
    return [
      {
        wallet,
        amount: 100,
        type: TransactionType.CREDIT,
        event: EventType.DEPOSIT,
        timestamp: new Date().getTime(),
        _id: wallet,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
