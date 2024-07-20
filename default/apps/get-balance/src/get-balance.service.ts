import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBalanceService {
  getHello(): string {
    return 'Hello World!';
  }
}
