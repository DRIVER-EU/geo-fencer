# AVRO Schema's

The following schema's are used within GeoFencer:

Simulatio Entity Item
* \schemas\git-avro-schemas\sim\entity\simulation_entity_item-value.avsc => Exsisting schema; Common Simulation Space Item, representing a visual entity inside the simulation world
* \schemas\git-avro-schemas\sim\simulation_object_deleted-value.avsc => Exsisting schema; Notification when SimItem is removed
* \schemas\git-avro-schemas\standard\named-geojson\standard_named_geojson-value.avsc => Exsisting schema; GeoJSON with envelop. Contains rule definitions 
* \schemas\git-avro-schemas\sim\geofencing\geofencing_event-value.avsc => Schema with information when rule fired

## Generate source code from AVRO schema's

The batch file '\schemas\GenerateTypeScriptCode.bat' generates typescript code. The driver-eu project 'https://github.com/DRIVER-EU/avro-typescript-converter' is used to generate the typescript code. 

* Management tool:

  

  