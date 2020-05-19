REM https://github.com/DRIVER-EU/avro-typescript-converter

@echo off

echo "Are the AVRO in sync with https://github.com/DRIVER-EU/avro-schemas.git (if not run GetSchemasFromGitHub.bat)"

call npm i -g avro-typescript-converter

echo Create TypeScript based on AVRO schema's.
call avro-typescript-converter -i avro-schemas/sim/geofencing/geofencing_event-value.avsc -o ./../src/models/avro_generated/eu/driver/model/sim/geofencing
call avro-typescript-converter -i avro-schemas/sim/entity/simulation_entity_item-value.avsc -o ./../src/models/avro_generated/eu/driver/model/sim/entity
call avro-typescript-converter -i avro-schemas/standard/named-geojson/standard_named_geojson-value.avsc -o ./../src/models/avro_generated/eu/driver/model/geojson
pause