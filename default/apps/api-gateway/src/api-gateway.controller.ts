import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientAlias } from './client.enum';
import { ActionType } from '@wallet/domain';

@Controller('wallet')
export class ApiGatewayController {
  constructor(
    @Inject(ClientAlias.BALANCE)
    private getBalanceClient: ClientProxy,
  ) {}

  @Get('/:wallet/balance')
  getBalance(@Param('wallet', ParseIntPipe) wallet: number) {
    return this.getBalanceClient.send(ActionType.GET_BALLANCE, wallet);
  }
}
