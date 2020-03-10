# AVRO Schema's

The geo-fencer service use the AVRO schema defined in https://github.com/DRIVER-EU/avro-schemas.git

The following schema's are used within GeoFencer:

* sim\entity\simulation_entity_item-value.avsc => Exsisting schema; Common Simulation Space Item, representing a visual entity inside the simulation world
* sim\simulation_object_deleted-value.avsc => Exsisting schema; Notification when SimItem is removed
* standard\named-geojson\standard_named_geojson-value.avsc => Exsisting schema; GeoJSON with envelop. This structure is used to store the rule definitions 
* sim\geofencing\geofencing_event-value.avsc => Schema with information when rule fired

## Generate source code from AVRO schema's

The driver-eu project 'https://github.com/DRIVER-EU/avro-typescript-converter' is used to generate the typescript code. 

The batch file '.\geo-fencer\packages\server\schemas\GenerateTypeScriptCode.bat' will generate the typescript models (or in server package command 'nmp run generate-avro'). The generated typescript code files can be found in 'geo-fencer\packages\server\src\models\avro_generated'.





