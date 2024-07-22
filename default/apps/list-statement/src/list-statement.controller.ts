import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ListStatementService } from './list-statement.service';
import { ActionType, TransactionInterface } from '@wallet/domain';

@Controller()
export class ListStatementController {
  constructor(private readonly listStatementService: ListStatementService) {}

  @MessagePattern(ActionType.LIST_STATEMENT)
  listStatement(wallet: string): Promise<TransactionInterface[]> {
    return this.listStatementService.listStatement(wallet);
  }
}
