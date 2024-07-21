import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export abstract class RemoteClientService
  implements OnModuleInit, OnModuleDestroy
{
  private client: ClientProxy;

  constructor(protected configService: ConfigService) {}

  abstract clientProxyOptions(): ClientOptions;

  onModuleInit() {
    this.client = ClientProxyFactory.create(this.clientProxyOptions());
  }

  onModuleDestroy() {
    this.client.close();
  }

  async sendMessage(pattern: string, data: any) {
    return firstValueFrom(
      this.client
        .send(pattern, data)
        .pipe(timeout(5000))
        .pipe(
          catchError((err) => {
            throw err;
          }),
        ),
    );
  }
}
