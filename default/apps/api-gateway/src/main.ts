import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT') || 3000);
  Logger.log(`🔥 API Gateway is Running`, 'APIGATEWAY');
}
bootstrap();
