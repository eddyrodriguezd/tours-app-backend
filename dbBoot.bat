::Run as dbBoot.bat http://localhost:8000
set host=%1
set "destinationUrl=%host%/api/destiny"
echo %destinationUrl%

curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Lima\", \"latitude\":-12.05, \"longitude\":-77.0333}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Arequipa\", \"latitude\":-16.3988, \"longitude\":-71.5369}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Trujillo\", \"latitude\":-8.1119, \"longitude\":-79.0289}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Chiclayo\", \"latitude\":-6.763, \"longitude\":-79.8366}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Chimbote\", \"latitude\":-9.0745, \"longitude\":-78.5936}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Piura\", \"latitude\":-5.2008, \"longitude\":-80.6253}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Cusco\", \"latitude\":-13.5183, \"longitude\":-71.9781}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Huancayo\", \"latitude\":-12.0667, \"longitude\":-75.2167}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Iquitos\", \"latitude\":-3.7333, \"longitude\":-73.25}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Pucallpa\", \"latitude\":-8.3833, \"longitude\":-74.55}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Tacna\", \"latitude\":-18.0556, \"longitude\":-70.2483}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Ica\", \"latitude\":-14.0667, \"longitude\":-75.7333}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Tarapoto\", \"latitude\":-6.4833, \"longitude\":-76.3667}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Cajamarca\", \"latitude\":-7.1644, \"longitude\":-78.5106}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Huacho\", \"latitude\":-11.1083, \"longitude\":-77.6083}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Huánuco\", \"latitude\":-9.9294, \"longitude\":-76.2397}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Ayacucho\", \"latitude\":-13.1631, \"longitude\":-74.2244}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Puno\", \"latitude\":-15.8433, \"longitude\":-70.0236}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Huaraz\", \"latitude\":-9.5333, \"longitude\":-77.5333}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Tumbes\", \"latitude\":-3.5667, \"longitude\":-80.45}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Ilo\", \"latitude\":-17.6486, \"longitude\":-71.3306}" %destinationUrl%
curl -X POST -H "Content-Type: application/json" -d "{\"city\": \"Nazca\", \"latitude\":-14.8289, \"longitude\":-74.9436}" %destinationUrl%
