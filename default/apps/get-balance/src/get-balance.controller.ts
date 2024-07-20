import { Controller, Get } from '@nestjs/common';
import { GetBalanceService } from './get-balance.service';

@Controller()
export class GetBalanceController {
  constructor(private readonly getBalanceService: GetBalanceService) {}

  @Get()
  getHello(): string {
    return this.getBalanceService.getHello();
  }
}
