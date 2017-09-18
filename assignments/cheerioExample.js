var fs = require('fs');
var cheerio = require('cheerio');

exports.parsePage = function(pNum){
    
    var content = fs.readFileSync('data/' + pNum + '.txt');
    var $ = cheerio.load(content);
    var rArray = [];
    
    for( let i = 1; i < 23; i ++){
        //c & p selector from chrome tools
        var elem = $('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(1)')
        .text();
        elem = elem.split('\n')[3].trim().split(/[/(/,-]/)[0];
        rArray.push(elem + ", New York, NY");
        }
    return rArray;
}
