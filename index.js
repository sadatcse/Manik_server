const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://sadatcse:SPrQNonURzWlJWwj@cluster0.38szpgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const workout = client.db('manik').collection('work');



    app.get('/workout', async (req, res) => {
      const cursor = workout.find();
      const result = await cursor.toArray();
      res.send(result);
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Manik workout Server is running')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})



