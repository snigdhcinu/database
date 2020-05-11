		
								// To connect to mongoDB 

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruits';

// Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

   // insertDocuments(db, function() { 		// when we require to display the data only, remove this portion, as insertion isn't supposed to happen, only display.
    findDocuments(db, function() {
      client.close();
    });
  // });
});

								// To insert data to our database

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    	{
    		name:'apple',
    		score:8,
    		review:'great taste'
    	},
     	{
     		name:'mango',
     		score:9,
     		review:'awesome flavour'
     	},
      	{
      		name:'kiwi',
      		score:5,
      		review:'highly overrated'
      	}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

						// To read the data from our node.js app from the database.
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
