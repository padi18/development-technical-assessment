import mongoose from "mongoose";

const getCollection = (collectionName) => {
  return mongoose.connection.db.collection(collectionName);
};

export { getCollection };
