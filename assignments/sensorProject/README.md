# data-structures-sensorData

Relational Sensor Database:

![Model](https://github.com/jsteele2003/data-structures/blob/master/assignments/Screen%20Shot%202017-10-23%20at%2014.04.28.png)

SQL Table:

CREATE TABLE sensorData  (
    ID int,
    temp int,
    light int,
    time timestamp DEFAULT current_timestamp
);

INSERT INTO sensorData (acc_x, acc_y, acc_z, knockTime, time)
VALUES ('0', '2000', '1500', 2017-10-22 13:10:02, DEFAULT);
