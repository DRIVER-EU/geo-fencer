# The NEST.JS framework exposes the swagger definition (version 2.0 of OpenApi) at http://localhost:<port>//api-json
Write-Host "Generate typscript REST api client for Geo Fencer"
$SwaggerSever = "http://localhost:7890/api-json "


Write-Host "Download swagger codegen image in docker"
# docker pull swaggerapi/swagger-codegen-cli

# show command options
#  docker run swaggerapi/swagger-codegen-cli config-help -l typescript-fetch
# docker run swaggerapi/swagger-codegen-cli help generate

$swagger_definition = resolve-path ".\SwaggerDefintion.json"
Remove-Item $swagger_definition

$ErrorCode = Invoke-WebRequest $SwaggerSever -OutFile "SwaggerDefintion.json"
if ($?){
   Write-Host "Generate TypeScript FETCH api client"
   # /opt/swagger-codegen
   docker run -v ${PWD}:/mounted swaggerapi/swagger-codegen-cli generate  -i /mounted/SwaggerDefintion.json -l typescript-fetch -o /mounted/generated_code -c /mounted/swagger-config.json
   Write-Host "Copy generated files to project"

   $executingScriptDirectory = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
   $source = resolve-path ".\generated_code\*.ts"
   $destination = resolve-path ".\..\src\generated_rest_api\"
   # TODO Clean old generated files
   Write-Host "Copy from $source"
   Write-Host "Copy from $destination"
   Copy-Item $source -Destination $destination -Force -Recurse -Verbose
   
} else {
	Write-Host "Failed to download SwaggerDefintion at $SwaggerSever"
}

Write-Host "Press any key to continue "
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

