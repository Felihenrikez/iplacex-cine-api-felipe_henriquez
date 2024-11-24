import {MongoClient, ServerApiVersion} from 'mongodb'

const uri ='mongodb+srv://eva3_express:AvLUhnaONwu6Ge6y@cluster-express.f66dj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-express'
const client =new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }

})

export default client