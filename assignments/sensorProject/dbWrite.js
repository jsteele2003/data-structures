var request = require('request');
const { Client } = require('pg');

// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'Json';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jsteele';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'sensordb';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor values in variables
        var device_json_string = JSON.parse(body).result;
        var accX = JSON.parse(device_json_string).x;
        var accY = JSON.parse(device_json_string).y;
        var accZ = JSON.parse(device_json_string).z;
        
        console.log(accX);

        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        //in the process of swapping out sensors, this is what is currently publishing from the photon, but will update it this week
        var thisQuery = "INSERT INTO sensorData VALUES (" + accX + "," + accY + "," + accZ + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every thirty seconds
setInterval(getAndWriteData, 30000);