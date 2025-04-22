import {MongoClient} from "mongodb";

const uri = process.env.MONGODB_URI;
const options={};

if(!uri){
  throw new Error("Add MONGODB_URI to .env.local");

}
const client = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;