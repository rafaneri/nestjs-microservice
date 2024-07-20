import { NestFactory } from '@nestjs/core';
import { ListStatementModule } from './list-statement.module';

async function bootstrap() {
  const app = await NestFactory.create(ListStatementModule);
  await app.listen(3000);
}
bootstrap();
