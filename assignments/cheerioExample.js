var fs = require('fs');
var cheerio = require('cheerio');

exports.parsePage = function(pNum){
    
    var content = fs.readFileSync('data/' + pNum + '.txt');
    var $ = cheerio.load(content);
    var rArray = [];
    
    for( let i = 1; i < 23; i ++){
        var streetSelector = $('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(1)')
        .text();
        location = streetSelector.split('\n')
        name = location[2].trim().split(/[/(/,-]/)[0];
        street = location[3].trim().split(/[/(/,-]/)[0];
        
        var timeSelector = $('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2)')
        .text();
        timeSelector = timeSelector.replace(/\s{3,}/g, '\n');
        timeList = timeSelector.trim().split("\n")
        // console.log(timeList);
        timeList.forEach(function(elem){
            var meetingInfo = [];
            meetingInfo.push(name);
            meetingInfo.push(street + ", New York, NY");
            time = elem.split(/From(.*)Meeting Type/);
            console.log(time)
            meetingInfo.push(time[0].trim());
            details  = time[1].split("Special Interest")
            // meetingInfo.push(time[1].trim());
            rArray.push(meetingInfo);
            // console.log(meetingInfo);
        })
    }
        
    //  var timeSelector = $('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + 6 + ') > td:nth-child(2)')
    //     .text();
    //     timeSelector = timeSelector.replace(/\s{3,}/g, '\n');
    //     timeList = timeSelector.trim().split("\n")
    //     console.log(timeList);
    //     time = timeList[10].split(/From(.*)Meeting Type/);
    //     console.log(time);
        
    return rArray;
}


