# Debugging service

The KAFKA docker environment must be running!

#### Geo-fencer service 

Open the "geo-fencer\packages\VisualCodeServer.code-workspace" in visual studio code.  Run in DOS terminal (in the directory "geo-fencer\packages\server") the command "npm run start:debug".

Run the debug configuration "Nest Debug (server)" from visual code (the run button). 

In the "DEBUG CONSOLE" tab the loading process messages are shown.  To test if the service is active: type in a web browser "http://localhost:7890/api" (7890 is default port, check configuration is the server port isn't changed). The swagger API explorer should be displayed.

#### Geo-fencer web-monitor interface

Open the "geo-fencer\packages\VisualCodeServer.code-workspace" in visual studio code. Run in DOS terminal (in the directory "geo-fencer\packages\dashboard" ) the command "npm run serve".

Run the debug configuration "Geo-fencer web interface" from visual code (the run button). 



