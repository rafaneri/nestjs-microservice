import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BootstrapConfigModule } from '@wallet/bootstrap-config';
import { ListStatementModule } from './list-statement.module';
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
  // Criando microsserviço que utiliza TCP como broker
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ListStatementModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('TCP_STATEMENT_HOST'),
        port: configService.get('LIST_STATEMENT_PORT'),
      },
    },
  );
  await app.listen();
  Logger.log(`🔥 List Statement is Running`, 'MICROSERVICE');
}
bootstrap();
