import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Wallet API')
    .setDescription('API Gateway entrypoint to Wallet microservice')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(configService.get<number>('PORT') || 3000);
  Logger.log(`🔥 API Gateway is Running`, 'APIGATEWAY');
}
bootstrap();
