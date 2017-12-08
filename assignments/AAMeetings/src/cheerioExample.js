var fs = require('fs');
var cheerio = require('cheerio');

exports.parsePage = function(pNum){
    
    var dayEnum = {
        'Sundays' : 0,
        'Mondays' : 1,
        'Tuesdays': 2,
        'Wednesdays' : 3,
        'Thursdays' : 4,
        'Fridays' : 5,
        'Saturdays': 6,
    };
    
    var content = fs.readFileSync('../data/ogData/' + "page" + pNum + '.txt');
    var $ = cheerio.load(content);
    var rArray = [];
    
    function updatePath(pIndex){
        return 'body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + pIndex + ')';
    }
    
    //loop through original table
    var i = 1;
    while($(updatePath(i)) != ""){
        
        //accumulate meeting details in object
        var tempItem = {};
        
        //default wheelchair access to false
        tempItem["wheelchairAccess"] = false;
        
        //grab location and time paths from cheerio
        
        var streetPath = $(updatePath(i) + '> td:nth-child(1)').text();
        var timePath = $(updatePath(i) + '> td:nth-child(2)').text().replace(/\s{3,}/g, '\n');
        
        //array of location details
        var locationDetails = streetPath.split('\n');
        
        //grab details by index
        if(locationDetails[1].trim()){
            tempItem["locationName"] = locationDetails[1].trim();
        }
        //cut out spaces and extraneous info
        tempItem['meetingName'] = locationDetails[2].trim().split(/[,-]/)[0].trim();
        tempItem['locationAddress'] = locationDetails[3].trim().split(/- |,|\.|\(/)[0].trim() + ", New York, NY";
        
        //can either be meeting details or wheelchair bool
        if(locationDetails[9].trim() == "Wheelchair access"){
            tempItem['wheelchairAccess'] = true;
        } else if (locationDetails[9].trim() != ""){
            tempItem['meetingDetails'] = locationDetails[9].trim();
        }
        
        //wheelchair bool can be bumped to here if details exist for the meeting
        if(locationDetails[13] != undefined && locationDetails[13].trim() != ''){
                tempItem['wheelchairAccess'] = true;
        }
        
        // create individual meetings for each time slot
        var timeDetails = timePath.trim().split('\n');
        timeDetails.forEach(function iterator(elem, index){
            var goodData = true;
            if(elem[0] == elem[0].toLowerCase()){
                goodData = false;
            }
            var time= elem.split(/From|Special Interest|Meeting Type/);
            var typeDetails;

            if(goodData == true){
                //we know these values must exist already - without optionals, will have to check for the others
                var meeting = {
                    "meetingName" : tempItem['meetingName'].replace(/\s{3,}/g, ' '),
                    "locationAddress" : tempItem["locationAddress"],
                    'wheelchairAccess' : tempItem['wheelchairAccess'],
                    "dayStr" : time[0].trim(),
                    "dayInt" : dayEnum[time[0].trim()],
                    "timeStr" : time[1].split("to")[0].trim()
                    
                };
                if('locationName' in tempItem){
                    meeting['locationName'] = tempItem['locationName'];
                }
                if('meetingDetails' in tempItem){
                    meeting['meetingDetails'] = tempItem['meetingDetails'];
                    
                }
                //get start time, handle noon and midnight as special cases
                var isMorning = (meeting['timeStr'].includes("AM"));
                if(isMorning){
                    if(meeting['timeStr'].includes("12")){
                        meeting['timeInt'] = 0;
                    } else{
                        meeting['timeInt'] = parseInt(time[1]);
                    }
                } else{
                    if(meeting['timeStr'].includes("12")){
                        meeting['timeInt'] = 12;
                    } else{
                        meeting['timeInt'] = (parseInt(time[1]) + 12) % 24;
                    }
                }
                if(time[2] != undefined){
                    typeDetails = time[2].split(' =')
                    if(typeDetails.length == 1){
                        meeting["specialInterest"] = typeDetails[0];
                    } else{
                        meeting['type'] = typeDetails[0].trim();
                        if(time[3] != undefined){
                            meeting['specialInterest'] = time[3].trim()
                        }
                    }
                } 
                rArray.push(meeting);
            }
        });
        //next meeting set
        i++;
    }
    return rArray;
}


