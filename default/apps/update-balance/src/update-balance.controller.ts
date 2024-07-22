import { Controller } from '@nestjs/common';
import { UpdateBalanceService } from './update-balance.service';
import { EventPattern } from '@nestjs/microservices';
import { ActionType, TransactionEventDtoInterface } from '@wallet/domain';

@Controller()
export class UpdateBalanceController {
  constructor(private readonly updateBalanceService: UpdateBalanceService) {}

  @EventPattern(ActionType.UPDATE_BALANCE)
  updateBalance(transaction: TransactionEventDtoInterface) {
    this.updateBalanceService.updateBalance(transaction);
  }
}
