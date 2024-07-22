import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BootstrapConfigModule } from '@wallet/bootstrap-config';
import { UpdateBalanceModule } from './update-balance.module';
import { isConnected } from '@wallet/repository';

async function bootstrap() {
  // Conectando ao banco de dados
  await isConnected;
  Logger.log(`🌨️  Database connected`, 'Mongoose');
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
