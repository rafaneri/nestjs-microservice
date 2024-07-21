import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ListStatementModule } from './list-statement.module';
import { BootstrapConfigModule } from '@wallet/bootstrap-config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
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
        host: configService.get('TCP_HOST'),
        port: configService.get('LIST_STATEMENT_PORT'),
      },
    },
  );
  await app.listen();
  Logger.log(`🔥 List Statement is Running`, 'MICROSERVICE');
}
bootstrap();
