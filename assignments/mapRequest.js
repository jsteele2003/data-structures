var request = require('request'); // npm install request
var async = require('async'); // npm install async
var pageModule = require('./cheerioExample');
var fs = require('fs');

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR

(function (){
    var apiKey = process.env.mapsAPIKey;
    
    var meetingAddresses = pageModule.parsePage("page1");
    
    //console.log(meetingAddresses.length);
    console.log(apiKey);
    
    var addresses = ["63 Fifth Ave, New York, NY", "16 E 16th St, New York, NY", "2 W 13th St, New York, NY"];
    
    function mapRequest(pAddresses){
        var rData = [];
        
        async.eachSeries(pAddresses, function asyncIteratee(value, callback) {
            var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
            var thisMeeting = new Object;
            thisMeeting.address = value;
            
            request(apiRequest, function requestCallback(err, resp, body) {
                if (err) {throw err;}
                thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
                rData.push(thisMeeting);
                //console.log(body);
            });
            setTimeout(callback, 500);
        }, function asyncCallback() {
            console.log(rData.length);
            fs.writeFile("data/addresses.txt", JSON.stringify(rData));
        });
    }
    
    mapRequest(pageModule.parsePage("page1"));
    // mapRequest(addresses);

}());
