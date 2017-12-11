var fs = require('fs');

var dbName = 'AA';
var collName = 'meetings';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment-timezone');
console.log(moment.tz(new Date(), "America/New_York").days());
console.log(moment.tz(new Date(), "America/New_York").hours());

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);
    
    collection.aggregate([

                {  $group : { _id :{
                          address : "$address",
                          latLong : "$latLong",
                          meetingName : "$meetingName",
                          meetingDetails : "$meetingDetails",
                          wheelchairAccess : "$wheelchairAccess"
                        },
                        day : { $push : "$day" },
                        dayInt : { $push : "$dayInt" },
                        time : { $push : "$time" },
                        timeInt : { $push : "$timeInt" }, 
                        type : { $push : "$meetingType" }
                  }
                 },
                 { $group : { _id :{
                    address : "$_id.address",
                    latLong : '$_id.latLong',
                     wheelchairAccess : '$_id.wheelchairAccess'
                 },
                    groups : {
                        $push : { group: "$_id.meetingName", day : "$day", time : "$time", type : '$type'},
                    }
                 }
                 },
                  ]).toArray(function(err, docs) {
                    if (err) {console.log(err)}
                    
                    else {
                        console.log("Writing", docs.length, "documents as a result of this aggregation.");
                        fs.writeFileSync('../data/processedMeetings/mongo_aggregation_result.JSON', JSON.stringify(docs, null, 4));
                    }
        db.close();
        
    });

}); //MongoClient.connect