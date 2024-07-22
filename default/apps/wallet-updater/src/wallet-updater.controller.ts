import { Controller } from '@nestjs/common';
import { WalletUpdaterService } from './wallet-updater.service';
import { ActionType, TransactionEventDto } from '@wallet/domain';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class WalletUpdaterController {
  constructor(private readonly walletUpdaterService: WalletUpdaterService) {}

  @EventPattern(ActionType.WALLET_UPDATE)
  materializeData(transaction: TransactionEventDto) {
    this.walletUpdaterService.materializeData(transaction);
  }
}
