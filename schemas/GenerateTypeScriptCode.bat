REM https://github.com/DRIVER-EU/avro-typescript-converter

@echo off

call npm i -g avro-typescript-converter

echo Create TypeScript based on AVRO schema's.
call avro-typescript-converter -i git-avro-schemas/sim/geofencing/geofencing_event-value.avsc -o ./../packages/server/src/models/avro_generated/eu/driver/model/sim/geofencing
call avro-typescript-converter -i git-avro-schemas/sim/entity/simulation_entity_item_ex-value.avsc -o ./../packages/server/src/models/avro_generated/eu/driver/model/sim/entity
call avro-typescript-converter -i git-avro-schemas/sim/simulation_object_deleted-value.avsc -o ./../packages/server/src/models/avro_generated/eu/driver/model/sim/
call avro-typescript-converter -i git-avro-schemas/standard/named-geojson/standard_named_geojson-value.avsc -o ./../packages/server/src/models/avro_generated/eu/driver/model/geojson
pause