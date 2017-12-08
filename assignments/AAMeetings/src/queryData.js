var fs = require('fs');

var dbName = 'AA';
var collName = 'meetings';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);
    
    collection.aggregate([
                   { 
                     $match: {
                        $and:[
                            {
                            "days" : "Tuesdays",
                            "times" : { $regex: '(?=.*PM)(?=^7|8|9)', $options: 'g' },
                            }
                         ]
                     }
                   }
                  ]).toArray(function(err, docs) {
                    if (err) {console.log(err)}
                    
                    else {
                        console.log("Writing", docs.length, "documents as a result of this aggregation.");
                        fs.writeFileSync('mongo_aggregation_result.JSON', JSON.stringify(docs, null, 4));
                    }
        db.close();
        
    });

}); //MongoClient.connect