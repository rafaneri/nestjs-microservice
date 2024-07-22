import { ApiProperty } from '@nestjs/swagger';
import { RegisterTransactionEventDto } from './register-transaction-event.dto';

/**
 * @description Interface de transferência de dados para registrar o evento de uma transação vinda de outro microserviço
 */
export class TransactionEventDto extends RegisterTransactionEventDto {
  /**
   * @description Identificador amigavel da carteira
   * @type {string}
   * @memberof TransactionEventDtoInterface
   */
  @ApiProperty({
    description: 'Identificador amigavel da carteira',
    type: 'string',
  })
  wallet: string;

  /**
   * @description Id da transação de referência (cancelamento)
   * @type {string}
   * @memberof TransactionEventDtoInterface
   */
  @ApiProperty({
    description: 'Descrição da transação',
    type: 'string',
  })
  description: string;

  /**
   * @description Id da transação de referência (cancelamento)
   * @type {string}
   * @memberof TransactionEventDtoInterface
   */
  @ApiProperty({
    description: 'Identificador da transação de referência',
    type: 'string',
  })
  reference?: string;
}
