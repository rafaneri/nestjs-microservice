import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetBalanceService } from './get-balance.service';
import { ActionType } from '@wallet/domain';

@Controller()
export class GetBalanceController {
  constructor(private readonly getBalanceService: GetBalanceService) {}

  @MessagePattern(ActionType.GET_BALLANCE)
  getBalance(wallet: string): number {
    return this.getBalanceService.getBalance(wallet);
  }
}
