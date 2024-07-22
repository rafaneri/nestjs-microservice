import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UpdateBalanceModule } from './update-balance.module';
import { BootstrapConfigModule } from '@wallet/bootstrap-config';

async function bootstrap() {
  // Criando um contexto para utilizar o ConfigService
  const appContext = await NestFactory.createApplicationContext(
    BootstrapConfigModule,
  );
  const configService = appContext.get(ConfigService);
  // Criando microsserviço que utiliza o RabbitMQ como broker
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UpdateBalanceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${configService.get('RBMQ_URL')}`],
        queue: `${configService.get('BALLANCE_QUEUE')}`,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  Logger.log(`🔥 Update Balance Running`, 'MICROSERVICE');
}
bootstrap();
