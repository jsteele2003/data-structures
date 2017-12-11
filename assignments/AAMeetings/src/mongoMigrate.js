var fs = require('fs');

var meetings = JSON.parse(fs.readFileSync('../data/processedMeetings/migrate.json'));

// Connection URL
var url = 'mongodb://' + process.env.mongoIP;

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection('meetings');

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    collection.insert(meetings);
    db.close();

}); //MongoClient.connect