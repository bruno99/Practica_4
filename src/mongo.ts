import { Db, MongoClient } from "mongodb";

export const connectDB = async (): Promise<Db> => {
  const mongouri: string = "mongodb+srv://Burbana:Burbana99@arquitecturaprogra.gli9m.mongodb.net/Bruno?retryWrites=true&w=majority";
  const client = new MongoClient(mongouri);
  try {
    await client.connect();
    console.info("MongoDB connected");
    return client.db("kitchen");
  } catch (e) {
    throw e;
  }
};
