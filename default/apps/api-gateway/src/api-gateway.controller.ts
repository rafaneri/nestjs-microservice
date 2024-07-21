import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetBalanceService } from './services/get-balance/get-balance.service';

@Controller('wallet')
export class ApiGatewayController {
  constructor(private getBalanceService: GetBalanceService) {}

  @Get('/:wallet/balance')
  getBalance(@Param('wallet', ParseIntPipe) wallet: number) {
    return this.getBalanceService.send(wallet);
  }
}
