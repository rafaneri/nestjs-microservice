import { Controller, Get } from '@nestjs/common';
import { ListStatementService } from './list-statement.service';

@Controller()
export class ListStatementController {
  constructor(private readonly listStatementService: ListStatementService) {}

  @Get()
  getHello(): string {
    return this.listStatementService.getHello();
  }
}
