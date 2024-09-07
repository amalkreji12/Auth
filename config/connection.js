var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbname = 'auth';

let db;

async function connectToDatabase(){
    try{
        const client = await MongoClient.connect(url);
        console.log('Database connected');
        db = client.db(dbname);
    }catch(err){
        console.log('Error connecting to database', err);
    }
}


function getDb(){
    if(!db){
        console.warn('Database not connected');
    }
    return db;
}

module.exports = {
    connectToDatabase,
    getDb
}