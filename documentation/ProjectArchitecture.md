# Project layout

- docker: Script to generate an docker image and script to start and manage docker container.
- documentation: Documentation for project
- packages\dashboard: Angular web application for monitoring the GeoFencer service (uses an REST interface to communicate with service)
- packages\server: The typescript GeoFencer service application
- schemas: The AVRO schema's used on the KAFKA bus
- TestRestCall: CURL application to test the service REST interface

The directory "packages" contains two Visual Studio Code workspace files.

