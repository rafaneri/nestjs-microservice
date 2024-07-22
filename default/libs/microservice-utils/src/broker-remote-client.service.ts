import { Injectable } from '@nestjs/common';
import { catchError, timeout } from 'rxjs/operators';
import { RemoteClientService } from './remote-client.service';

@Injectable()
export abstract class BrokerRemoteClientService extends RemoteClientService {
  emitMessage<T, V>(pattern: string, data: any) {
    this.client
      .emit<T, V>(pattern, data)
      .pipe(timeout(5000))
      .pipe(
        catchError((err) => {
          throw err;
        }),
      );
  }
}
