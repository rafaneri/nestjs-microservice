import { ApiProperty } from '@nestjs/swagger';
import { RegisterTransactionEventDto } from './register-transaction-event.dto';

/**
 * @description Interface de transferência de dados para registrar o evento de uma transação vinda de outro microserviço
 */
export class TransactionEventDto extends RegisterTransactionEventDto {
  /**
   * @description Identificador da carteira
   * @type {string}
   * @memberof TransactionEventDtoInterface
   */
  @ApiProperty({
    description: 'Identificador amigavel da carteira',
    type: 'ObjectId',
  })
  wallet: string;
}
