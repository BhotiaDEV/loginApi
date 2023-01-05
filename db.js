let mongoose = require ('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://test:test123@cluster0.v86nyzc.mongodb.net/?retryWrites=true&w=majority/tataCliq');
// const MongoClient = require('mongodb').MongoClient;
// const MongoURL = "mongodb://0.0.0.0:27017/?directConnection=true";

// MongoClient.connect(MongoURL,(err,)=>{
//     if(err) throw err;
//    db = client.db
// })