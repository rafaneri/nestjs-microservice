import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { RemoteClientService } from './remote-client.service';

@Injectable()
export abstract class P2PRemoteClientService extends RemoteClientService {
  async sendMessage<T, V>(pattern: string, data: any) {
    return firstValueFrom(
      this.client
        .send<T, V>(pattern, data)
        .pipe(timeout(5000))
        .pipe(
          catchError((err) => {
            throw err;
          }),
        ),
    );
  }
}
