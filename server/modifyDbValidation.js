/* import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "mongodb+srv://eerouusaro:OmQSkmjNadnPseBD@nighthawk.o4hfkej.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("test");

await db.command({ collMod: "dreams",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["summary", "quality", "dreamer"],
            properties: {
                summary: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                quality: {
                    bsonType: "string",
                    enum: ["Ordinary", "Nightmare", "Dream come true"],
                    description: "must be one of: Ordinary, Nightmare, Dream come true"
                },
                dreamer: {
                    bsonType: "objectId",
                    description: "must be a valid object id"
                }
            
            }

        }
    }
});
console.log("done"); */