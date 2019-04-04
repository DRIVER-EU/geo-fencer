import { GeoFencerServer } from './main';
import { EvaluateGeoFencerExpression } from './models/geofencer/EvaluateGeoFencerExpression'
import { testItemData} from './testdata/testdata'

import * as npmPackage from './../package.json';
/*
let condition = "GUID = 'TEST1' AND (NAME = 'TEST2' OR GUID =  'TEST2' ) AND ObjectType = 'Vehicle'";
console.log(condition);
let eval1 = new EvaluateGeoFencerExpression(condition);
const ast = eval1.IsGeoFencerExpressionValid(testItemData,(error : Error) => {
  console.error("Error in expression (disable rule): "+ error.message);
});
*/
/* 

Initial ENTRY point to start GeoFencer service


*/

console.log(`Start service "${npmPackage.name}, v${npmPackage.version}"`);
console.log(`Description: "${npmPackage.description}"`);

const app: GeoFencerServer = new GeoFencerServer();





