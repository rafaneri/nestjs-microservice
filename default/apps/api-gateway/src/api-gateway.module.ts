import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}
