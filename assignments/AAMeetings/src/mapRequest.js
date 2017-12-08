var request = require('request'); // npm install request
var async = require('async'); // npm install async
var pageModule = require('./cheerioExample');
var fs = require('fs');

(function (){
    var apiKey = process.env.mapsAPIkey;
    
    function mapRequest(pMeetings){
        var rData = [];
        
        async.eachSeries(pMeetings, function asyncIterator(value, callback) {
            var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value["locationAddress"].split(' ').join('+') + '&key=' + apiKey;
            var thisMeeting = new Object;
            thisMeeting.address = value["locationAddress"];
            thisMeeting.meetingName = value["meetingName"];
            thisMeeting.day = value["dayStr"];
            thisMeeting.dayInt = value["dayInt"];
            thisMeeting.time = value["timeStr"];
            thisMeeting.timeInt = value["timeInt"];
            
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
            console.log("running");
            request(apiRequest, function requestCallback(err, resp, body) {
                if (err) {
                    throw err;}
                thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
                rData.push(thisMeeting);
            });
            setTimeout(callback, 50);
        }, function asyncCallback() {
            console.log(rData);
            fs.writeFile("../data/proccessedMeetings/meetings.json", JSON.stringify(rData));
        });
    }
    var meetings = [];
    for(var i = 1; i<11; i++){
        meetings = meetings.concat(pageModule.parsePage(i));
    }
    console.log(meetings.slice(0,3).length);
    mapRequest(meetings);
}());
