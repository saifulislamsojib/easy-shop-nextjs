import { MongoClient, ServerApiVersion } from "mongodb";

/**
 * @type {import("mongodb").Db}
 */
let db;

const DbConnect = async () => {
  if (db) return db;
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@next-hero.ktnme97.mongodb.net/?retryWrites=true&w=majority`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("easy-shop");
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return db;
  } catch (error) {
    console.log(error.message);
  }
};

export default DbConnect;
