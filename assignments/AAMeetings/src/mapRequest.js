var request = require('request'); // npm install request
var async = require('async'); // npm install async
var pageModule = require('./cheerioParse');
var fs = require('fs');

(function (){
    var apiKey = process.env.mapsAPIkey;
    function mapRequest(pMeetings){
        var rData = [];
        async.eachSeries(pMeetings, function asyncIteratee(value, callback) {
            var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value["locationAddress"].split(' ').join('+') + '&key=' + apiKey;
            var thisMeeting = {};
            thisMeeting.meetingName = value["meetingName"];
            thisMeeting.day = value["dayStr"];
            thisMeeting.dayInt = value["dayInt"];
            thisMeeting.time = value["timeStr"];
            thisMeeting.timeInt = value["timeInt"];
            thisMeeting.wheelchairAccess = value["wheelchairAccess"];
            
            //"unwrapping" optionals
            if("locationName" in value){
                thisMeeting.locationName = value['locationName'];
            }
            if('meetingDetails' in value){
                thisMeeting.meetingDetails = value['meetingDetails']
            }
            if('type' in value){
                thisMeeting.meetingType = value['type']
            }
            if('specialInterest' in value){
                thisMeeting.specialInterest = value["specialInterest"]
            }
            request(apiRequest, function requestCallback(err, resp, body) {
                if (err) {
                    console.log(err);
                    throw err;}
                // console.log(body);
                thisMeeting.address = JSON.parse(body).results[0].formatted_address;
                thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
                rData.push(thisMeeting);
                setTimeout(callback, 500);
            });
        }, function asyncCallback() {
            console.log(rData);
            fs.writeFile("../data/processedMeetings/meetings.json", JSON.stringify(rData));
        });
    }
    var meetings = [];
    // fs.readdir(dir, (err, files) => {
    
    // });
    for(var i = 1; i<11; i++){
        meetings = meetings.concat(pageModule.parsePage(i));
    }
    console.log(meetings.length);
    mapRequest(meetings);
}());
