import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ActionType, TransactionInterface } from '@wallet/domain';
import { RemoteClientService } from '../remote-client.service';

@Injectable()
export class ListStatementService extends RemoteClientService {
  clientProxyOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.configService.get('TCP_HOST'),
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
