# Script to build docker image for DRIVER-EU
$ImageName = "driver-eu-geofencer"
$StartTime = (Get-Date).Millisecond
cd ./../../packages/server/
docker build  -f dockerfile.txt --tag=$ImageName .
Write-Host "Create docker image $ImageName'"
Write-Host "Press any key to continue "
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")