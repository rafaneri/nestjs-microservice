export interface IGenericRepository<T> {
  create(data: T): Promise<T>;
  findAll(filter: any, projection?: any): Promise<T[]>;
  aggregate(pipeline: any[]): Promise<any>;
  update(id: any, data: T): Promise<T>;
}
