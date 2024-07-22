import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetBalanceService } from './get-balance.service';
import { ActionType, BalanceDto } from '@wallet/domain';

@Controller()
export class GetBalanceController {
  constructor(private readonly getBalanceService: GetBalanceService) {}

  @MessagePattern(ActionType.GET_BALANCE)
  async getBalance(wallet: string): Promise<BalanceDto> {
    const balance = await this.getBalanceService.getBalance(wallet);
    return { balance };
  }
}
