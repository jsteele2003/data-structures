var request = require('request'); // npm install request
var async = require('async'); // npm install async
var pageModule = require('./cheerioExample');
var fs = require('fs');

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR

(function (){
    
    var apiKey = process.env.mapsAPIKey;
    var addresses = ["63 Fifth Ave, New York, NY", "16 E 16th St, New York, NY", "2 W 13th St, New York, NY"];
    
    function mapRequest(pMeetings){
        var rData = [];
        
        async.eachSeries(pMeetings, function asyncIteratee(value, callback) {
            var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value[1].split(' ').join('+');
            var thisMeeting = new Object;
            thisMeeting.address = value[1];
            thisMeeting.name = value[0];
            thisMeeting.days = value[2];
            thisMeeting.times = value[3];
            
            request(apiRequest, function requestCallback(err, resp, body) {
                if (err) {throw err;}
                console.log(body);
                thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
                rData.push(thisMeeting);
                //console.log(body);
            });
            setTimeout(callback, 500);
        }, function asyncCallback() {
            console.log(rData.length);
            fs.writeFile("data/meetings.json", JSON.stringify(rData));
        });
    }
    
    meetings = pageModule.parsePage("page1");
    console.log(meetings[0]);
    var mAddresses = [];
    meetings.forEach(function(elem){
        mAddresses.push(elem[1]);
    })
    mapRequest(meetings);

}());
