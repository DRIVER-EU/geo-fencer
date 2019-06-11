REM https://github.com/degordian/avro-to-typescript

@echo off
echo Create TypeScript based on AVRO schema's.
echo Manual corrected after creation
call avro-to-typescript --compile . ./generated_code
pause