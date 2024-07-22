import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export abstract class RemoteClientService
  implements OnModuleInit, OnModuleDestroy
{
  protected client: ClientProxy;

  constructor(protected configService: ConfigService) {}

  abstract clientProxyOptions(): ClientOptions;

  onModuleInit() {
    this.client = ClientProxyFactory.create(this.clientProxyOptions());
  }

  onModuleDestroy() {
    this.client.close();
  }
}
