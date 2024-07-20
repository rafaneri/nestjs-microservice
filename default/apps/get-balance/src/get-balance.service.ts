import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBalanceService {
  getBalance(wallet: number): number {
    return wallet;
  }
}
