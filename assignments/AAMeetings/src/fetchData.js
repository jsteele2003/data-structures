var fs = require('fs');
var _ = require('underscore');
var dbName = 'AA'; 
var collName = 'meetings'; 


    fs.readFile('../data/processedMeetings/meetings.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var addressData = JSON.parse(data);
      //some spacing issues, should work levenshtein distance in at some point
      //console.log(uniqueAddresses);
      dbInsert(addressData);
    });
    
    function dbInsert(docs){
    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(docs);
        db.close();

    }); //MongoClient.connect
}
