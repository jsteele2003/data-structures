var express = require('express'), app = express();
var fs = require('fs');

// HTML wrappers for AA data
var index1 = fs.readFileSync("./data/index1.txt");
