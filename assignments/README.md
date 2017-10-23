# data-structures-assignments
repository for Data Structures coursework, Data Visualisation Msc

Relational Sensor Database:

![Model](https://github.com/jsteele2003/data-structures/blob/master/assignments/Screen%20Shot%202017-10-23%20at%2014.04.28.png)

SQL Table:

CREATE TABLE sensorData  (
    ID int,
    acc_x int,
    acc_y int,
    acc_z int,
    knockTime timestamp,
    time timestamp DEFAULT current_timestamp
);

INSERT INTO sensorData (acc_x, acc_y, acc_z, knockTime, time)
VALUES ('0', '2000', '1500', 2017-10-22 13:10:02.0474381, DEFAULT);

