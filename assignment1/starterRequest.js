var request = require('request');
var fs = require('fs');

function twoDigit(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function meetingRequest(pageNum){
  request('http://visualizedata.github.io/datastructures/data/m' + twoDigit(pageNum) + '.html', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fs.writeFile('data/' + 'page' + pageNum.toString() + '.txt', body);
    }
    else {console.error('request failed')}
  })
}

for(var i = 1; i < 11; i++){
  MeetingRequest(i);
}
