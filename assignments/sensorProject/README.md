# Data Structures: Sensor Data Interface Specifications

## Intro

For the Second Final Project, I installed my sensors within my custom desktop PC. The breadboard was placed directly on top of the power supply and below the GPU, with the photoresistor angled toward a grate facing the surface of my desk.
My intentions were to use the sensors to track the intensity of my computational work at my desk, as well as my general presence there- depending on the applications running at any given time on the PC, internal temperatures can range from ~30-80°C, with intensive graphical computation making up the highest extremes.
With the photoresistor angled towards the grate, it was able to track the ambient light in the room to a sufficient degree to distinguish between night and day, and was easily able to pick up the use of my desk lamp.

## Interface

In graphically representing this data, I wanted to create a fairly granular log of my desktop activity for the span of a month, using temperature as a proxy for intensity of computation. Therefore, in order to capture these intensities in relation to each other, the proposed interface details a chronological heatmap, tracking the recorded temperature and light across the hours of the day:

![alt text](https://github.com/jsteele2003/data-structures/blob/master/assignments/sensorProject/assets/sensorInterface.jpg "Sensor Interface")

