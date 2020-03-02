import * as mongoose from 'mongoose';

export const clearDatabase = async () => {
  const clearCollectionPromises = [
    Object.values(mongoose.connection.collections).map(coll => {
      return (coll as any).deleteMany();
    })
  ];

  return Promise.all(clearCollectionPromises);
};
