import { NestFactory } from '@nestjs/core';
import { GetBalanceModule } from './get-balance.module';

async function bootstrap() {
  const app = await NestFactory.create(GetBalanceModule);
  await app.listen(3000);
}
bootstrap();
