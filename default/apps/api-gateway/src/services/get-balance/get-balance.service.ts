import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ActionType } from '@wallet/domain';
import { P2PRemoteClientService } from '../p2p-remote-client.service';

@Injectable()
export class GetBalanceService extends P2PRemoteClientService {
  clientProxyOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.configService.get('TCP_BALANCE_HOST'),
        port: this.configService.get('GET_BALANCE_PORT'),
      },
    };
  }

  public getBalance(wallet: string) {
    return this.sendMessage<number, string>(ActionType.GET_BALANCE, wallet);
  }
}
