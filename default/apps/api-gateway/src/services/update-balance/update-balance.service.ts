import { Injectable } from '@nestjs/common';
import { RemoteClientService } from '../remote-client.service';
import { ClientOptions, Transport } from '@nestjs/microservices';
import {
  ActionType,
  RegisterTransactionEventDtoInterface,
  TransactionEventDtoInterface,
} from '@wallet/domain';

@Injectable()
export class UpdateBalanceService extends RemoteClientService {
  clientProxyOptions(): ClientOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`${this.configService.get('RBMQ_URL')}`],
        queue: `${this.configService.get('BALLANCE_QUEUE')}`,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  public updateBalance(
    wallet: string,
    transaction: RegisterTransactionEventDtoInterface,
  ) {
    this.sendMessage<void, TransactionEventDtoInterface>(
      ActionType.UPDATE_BALANCE,
      { wallet, ...transaction },
    );
  }
}
