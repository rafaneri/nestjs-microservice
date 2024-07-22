/**
 * @description Interface para descrever uma entidade de banco de dados
 */
export interface EntityInterface {
  /**
   * @description Identificador da entidade
   * @type {string}
   * @memberof EntityInterface
   * @readonly
   */
  _id?: any;
  /**
   * @description Data de crição da entidade
   * @type {Date}
   * @memberof EntityInterface
   * @default new Date()
   */
  createdAt?: Date;
  /**
   * @description Data de atualização da entidade
   * @type {Date}
   * @memberof EntityInterface
   * @default new Date()
   */
  updatedAt?: Date;
}
