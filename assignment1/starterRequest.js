var request = require('request');
var fs = require('fs');

function MeetingRequest(pageNum){
  
  
}

request('http://visualizedata.github.io/datastructures/data/m01.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
  else {console.error('request failed')}
})