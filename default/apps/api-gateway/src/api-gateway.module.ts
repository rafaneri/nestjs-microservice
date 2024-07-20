import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
