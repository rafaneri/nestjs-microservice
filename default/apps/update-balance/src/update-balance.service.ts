import { Injectable } from '@nestjs/common';
import { ActionType, TransactionEventDto } from '@wallet/domain';
import { UpdateBalanceRepository } from './update-balance.repository';
import { BrokerRemoteClientService } from '@wallet/microservice-utils';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidateEventsService } from '@wallet/validate-events';

@Injectable()
export class UpdateBalanceService extends BrokerRemoteClientService {
  clientProxyOptions(): ClientOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`${this.configService.get('RBMQ_URL')}`],
        queue: `${this.configService.get('WALLET_QUEUE')}`,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  constructor(
    protected configService: ConfigService,
    readonly validateEventsService: ValidateEventsService,
    readonly repository: UpdateBalanceRepository,
  ) {
    super(configService);
  }

  async updateBalance(transaction: TransactionEventDto) {
    const canTransact =
      await this.validateEventsService.canTransact(transaction);
    // Poderia ter utilizado um emissor de eventos para notificar o que uma transação válida chegou
    if (canTransact.status) {
      await this.repository.updateBalance(transaction);
      this.emitMessage<void, TransactionEventDto>(
        ActionType.WALLET_UPDATE,
        transaction,
      );
    }
  }
}
