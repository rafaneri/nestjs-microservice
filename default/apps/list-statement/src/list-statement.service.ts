import { Injectable } from '@nestjs/common';

@Injectable()
export class ListStatementService {
  getHello(): string {
    return 'Hello World!';
  }
}
