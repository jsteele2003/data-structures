var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('data/page1.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print names of thesis students
for( let j = 1; j < 5; j ++){
    $('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(' + j + ') > td:nth-child(1)')
    .each(callbackForEach(j));
}


//named callback to create enclosing scope
function callbackForEach(j){
    return function(i, elem) {
        console.log($(elem).text().trim());
        console.log(j);
    }
    
}

// // print project titles
// $('h').each(function(i, elem) {
//     console.log($(elem).text());
// });
