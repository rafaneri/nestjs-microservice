import { Injectable } from '@nestjs/common';
import { GetBalanceRepository } from './get-balance.repository';

@Injectable()
export class GetBalanceService {
  constructor(readonly repository: GetBalanceRepository) {}
  async getBalance(wallet: string): Promise<number> {
    return this.repository.getBalance(wallet);
  }
}
