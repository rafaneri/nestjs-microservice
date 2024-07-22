import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import {
  ActionType,
  RegisterTransactionEventDtoInterface,
  TransactionEventDtoInterface,
} from '@wallet/domain';
import { BrokerRemoteClientService } from '../broker-remote-cliente.service';

@Injectable()
export class UpdateBalanceService extends BrokerRemoteClientService {
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
    this.emitMessage<void, TransactionEventDtoInterface>(
      ActionType.UPDATE_BALANCE,
      { wallet, ...transaction },
    );
  }
}
