# GeoFencer dashboard

Web client to monitor the GeoServer service . Uses CsNext as framework (see <https://github.com/TNOCS/csnext>). 



# REST client

The server uses a code-first approach for OpenApi.  Based on the server api controller and annotations a swagger definition is generated. Start the server and run ' swagger_codegenerator\GenerateCodeWithDocker.bat'. This will download the swagger definition from the server and generate the swagger code (using a docker container).