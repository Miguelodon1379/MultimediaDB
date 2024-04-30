import mongodb from 'mongodb'


const uri = process.env.ATLAS_URI || ""

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = client.db("medialib")


export default db
