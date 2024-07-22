import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ActionType, TransactionInterface } from '@wallet/domain';
import { P2PRemoteClientService } from '../p2p-remote-client.service';

@Injectable()
export class ListStatementService extends P2PRemoteClientService {
  clientProxyOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.configService.get('TCP_STATEMENT_HOST'),
        port: this.configService.get('LIST_STATEMENT_PORT'),
      },
    };
  }

  public listStatement(wallet: string) {
    return this.sendMessage<TransactionInterface[], string>(
      ActionType.LIST_STATEMENT,
      wallet,
    );
  }
}
