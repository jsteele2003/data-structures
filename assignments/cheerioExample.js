var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('data/page1.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// for( let j = 1; j < 23; j ++){
//     //c & p selector from chrome tools
//     $('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + j + ') > td:nth-child(1)')
//     .each(callbackWrapperForEach(j));
// }

for( let i = 1; i < 23; i ++){
    //c & p selector from chrome tools
    var elem = $('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(1)')
    .text();
    console.log(elem.split('\n')[3].trim());
    
}
