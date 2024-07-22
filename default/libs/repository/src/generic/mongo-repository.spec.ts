import { Entity } from '@wallet/domain';
import { MongoRepository } from './mongo-repository';

describe('MongoRepository', () => {
  it('should save a valid data object when provided', async () => {
    const data = new Entity();
    const repository = new MongoRepository(Entity);
    const result = await repository.create(data);
    expect(result._id).toBeDefined();
  });

  it('should return a valid list objects', async () => {
    const repository = new MongoRepository(Entity);
    await Promise.all([
      repository.create(new Entity()),
      repository.create(new Entity()),
    ]);
    const all = await repository.findAll();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it('should return one object from list', async () => {
    const repository = new MongoRepository(Entity);
    const data = await repository.create(new Entity());
    const entity = await repository.findOne({ createdAt: data.createdAt });
    expect(entity.createdAt).toEqual(data.createdAt);
  });

  it('should be updated with a new updatedAt value', async () => {
    const data = new Entity();
    const repository = new MongoRepository(Entity);
    const result = await repository.create(data);
    const updated = await repository.update(result._id, result);
    expect(updated.updatedAt).not.toEqual(result.updatedAt);
  });

  it('should be able to aggregate', async () => {
    const repository = new MongoRepository(Entity);
    const [data1, data2] = await Promise.all([
      repository.create(new Entity()),
      repository.create(new Entity()),
    ]);
    const result = await repository.aggregate([
      {
        $match: {
          _id: {
            $in: [data1._id, data2._id],
          },
        },
      },
    ]);
    expect(result.length).toBe(2);
  });
});
