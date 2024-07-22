import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import {
  ActionType,
  RegisterTransactionEventDto,
  TransactionEventDto,
} from '@wallet/domain';
import { BrokerRemoteClientService } from '../broker-remote-client.service';

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
    transaction: RegisterTransactionEventDto,
  ) {
    this.emitMessage<void, TransactionEventDto>(
      ActionType.UPDATE_BALANCE,
      { wallet, ...transaction },
    );
  }
}
