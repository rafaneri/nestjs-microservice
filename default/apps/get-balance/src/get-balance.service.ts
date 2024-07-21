import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBalanceService {
  getBalance(wallet: string): number {
    return 1;
  }
}
