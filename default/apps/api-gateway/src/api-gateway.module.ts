import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiGatewayController } from './api-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientAlias } from './client.enum';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: ClientAlias.BALANCE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('TCP_HOST'),
            port: configService.get('GET_BALANCE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}
