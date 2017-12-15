# Data Structures: Sensor Data Interface Specifications

## Intro

For the Second Final Project, I installed my sensors within my custom desktop PC. The breadboard was placed directly on top of the power supply and below the GPU, with the photoresistor angled toward a grate facing the surface of my desk.
My intentions were to use the sensors to track the intensity of my computational work at my desk, as well as my general presence there- depending on the applications running at any given time on the PC, internal temperatures can range from ~30-80°C, with intensive graphical computation making up the highest extremes.
With the photoresistor angled towards the grate, it was able to track the ambient light in the room to a sufficient degree to distinguish between night and day, and was easily able to pick up the use of my desk lamp.

## Interface

In graphically representing this data, I wanted to create a fairly granular log of my desktop activity for the span of a month, using temperature as a proxy for intensity of computation. Therefore, in order to capture these intensities in relation to each other, the proposed interface details a chronological heatmap, tracking the recorded temperature and light across the hours of the day:

![alt text](https://github.com/jsteele2003/data-structures/blob/master/assignments/sensorProject/assets/sensorInterface.jpg "Sensor Interface")

The heatmap will take the general form of a table, tracking the recorded temperature and light according to minute, and then grouping the data across a longer time period. The details for the enumerated annotations within the diagram are as follows: 

I. The Y-axis will map to time of day, running from 12:00AM-12:00AM. 

II. The X-axis will be capable of either grouping the day-long data into week-long intervals, or simply represent them as consecutive days. Each discrete element on the Y-axis would be split into two values, one each for temperature and light.

III. The right sidebar will primarily function as a legend for mapping the temperature and light heatmap gradients to their physical correlates. I plan on using two different sequential colour scales to create the two heatmaps, with progressively darker hues mapping to more intense values. 

IV. Above the heatmap legend will be a pair of radio buttons, allowing the user to group the daily data by week, or track day-to-dya with no aggregation.

V & VI. In order to provide qualitative context, there will be interactive markers at the top of each y-axis element, providing on-hover tooltips with information on events that may have impacted the values seen in the coming time interval.
Likewise, at notable periods of intensity/general interest over the span of the hourly values, tooltips will appear with more granular information and context on why such values may have appeared.

VII & VIII. Since the sensors are writing data to the database every 30 seconds, minute-to-minute temp and light data could be tracked as "slivers" of colour on the X-axis hourly scale.