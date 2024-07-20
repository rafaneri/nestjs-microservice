import { NestFactory } from '@nestjs/core';
import { UpdateBalanceModule } from './update-balance.module';

async function bootstrap() {
  const app = await NestFactory.create(UpdateBalanceModule);
  await app.listen(3000);
}
bootstrap();
