import { Controller, Get } from '@nestjs/common';
import { UpdateBalanceService } from './update-balance.service';

@Controller()
export class UpdateBalanceController {
  constructor(private readonly updateBalanceService: UpdateBalanceService) {}

  @Get()
  getHello(): string {
    return this.updateBalanceService.getHello();
  }
}
