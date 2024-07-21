import { Controller, Get, Param } from '@nestjs/common';
import { GetBalanceService } from './services/get-balance/get-balance.service';
import { ListStatementService } from './services/list-statement/list-statement.service';

@Controller('wallet')
export class ApiGatewayController {
  constructor(
    private getBalanceService: GetBalanceService,
    private listStatementService: ListStatementService,
  ) {}

  @Get('/:wallet/balance')
  getBalance(@Param('wallet') wallet: string) {
    return this.getBalanceService.getBalance(wallet);
  }

  @Get('/:wallet/statement')
  listStatement(@Param('wallet') wallet: string) {
    return this.listStatementService.listStatement(wallet);
  }
}
