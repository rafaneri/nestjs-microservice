import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetBalanceService } from './services/get-balance/get-balance.service';
import { ListStatementService } from './services/list-statement/list-statement.service';
import {
  BalanceDto,
  RegisterTransactionEventDto,
  TransactionEventDto,
} from '@wallet/domain';
import { UpdateBalanceService } from './services/update-balance/update-balance.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('wallet')
@Controller('wallet')
export class ApiGatewayController {
  constructor(
    private getBalanceService: GetBalanceService,
    private listStatementService: ListStatementService,
    private updateBalanceService: UpdateBalanceService,
  ) {}

  @Get('/:wallet/balance')
  @ApiResponse({
    status: 200,
    description: 'Saldo consultado com sucesso.',
    type: BalanceDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro de comunicação com o servidor de microservico',
  })
  @ApiParam({
    name: 'wallet',
    description: 'Identificador amigavel da carteira',
    type: String,
  })
  getBalance(@Param('wallet') wallet: string): Promise<BalanceDto> {
    return this.getBalanceService.getBalance(wallet);
  }

  @Get('/:wallet/statement')
  @ApiResponse({
    status: 200,
    description: 'Extrato consultado com sucesso.',
    type: [TransactionEventDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Erro de comunicação com o servidor de microservico',
  })
  @ApiParam({
    name: 'wallet',
    description: 'Identificador amigavel da carteira',
    type: String,
  })
  listStatement(
    @Param('wallet') wallet: string,
  ): Promise<TransactionEventDto[]> {
    return this.listStatementService.listStatement(wallet);
  }

  @Post('/:wallet/transact')
  @ApiResponse({
    status: 201,
    description: 'O registro foi criado com sucesso.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro de comunicação com o servidor',
  })
  @ApiParam({
    name: 'wallet',
    description: 'Identificador amigavel da carteira',
    type: String,
  })
  updateWallet(
    @Param('wallet') wallet: string,
    @Body() transaction: RegisterTransactionEventDto,
  ) {
    return this.updateBalanceService.updateBalance(wallet, transaction);
  }
}
