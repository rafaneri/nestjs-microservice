import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ActionType, BalanceDto } from '@wallet/domain';
import { P2PRemoteClientService } from '@wallet/microservice-utils';

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

  public getBalance(wallet: string): Promise<BalanceDto> {
    return this.sendMessage<BalanceDto, string>(ActionType.GET_BALANCE, wallet);
  }
}
