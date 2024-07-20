import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientAlias } from './client.enum';

describe('ApiGatewayController', () => {
  let apiGatewayController: ApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
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
    }).compile();

    apiGatewayController = app.get<ApiGatewayController>(ApiGatewayController);
  });

  describe('root', () => {
    it('should be getBalance defined', () => {
      expect(apiGatewayController.getBalance(1)).toBeDefined();
    });
  });
});
