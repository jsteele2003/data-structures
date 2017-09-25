var fs = require('fs');
var _ = require('underscore');
var dbName = 'AA'; 
var collName = 'locations'; 

var addressData;
var uniqueAddresses;

    fs.readFile('./data/addresses.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      addressData = JSON.parse(data);
      //some spacing issues, should work levenshtein distance in at some point
      uniqueAddresses = _.uniq(addressData, function(object, key, address) { 
        return object.address;
      });
      console.log(uniqueAddresses);
      dbInsert(uniqueAddresses);
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
