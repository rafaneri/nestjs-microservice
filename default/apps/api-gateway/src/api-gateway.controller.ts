import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetBalanceService } from './services/get-balance/get-balance.service';
import { ListStatementService } from './services/list-statement/list-statement.service';
import { RegisterTransactionEventDtoInterface } from '@wallet/domain';
import { UpdateBalanceService } from './services/update-balance/update-balance.service';

@Controller('wallet')
export class ApiGatewayController {
  constructor(
    private getBalanceService: GetBalanceService,
    private listStatementService: ListStatementService,
    private updateBalanceService: UpdateBalanceService,
  ) {}

  @Get('/:wallet/balance')
  getBalance(@Param('wallet') wallet: string) {
    return this.getBalanceService.getBalance(wallet);
  }

  @Get('/:wallet/statement')
  listStatement(@Param('wallet') wallet: string) {
    return this.listStatementService.listStatement(wallet);
  }

  @Post('/:wallet/transact')
  updateWallet(
    @Param('wallet') wallet: string,
    @Body() transaction: RegisterTransactionEventDtoInterface,
  ) {
    return this.updateBalanceService.updateBalance(wallet, transaction);
  }
}
