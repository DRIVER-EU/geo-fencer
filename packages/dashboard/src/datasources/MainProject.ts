import { IDatasource } from '@csnext/cs-core';
import { ManagementApi, Configuration, FakeGeoJSONEnvelopeInterface, SimulationTestData } from './../generated_rest_api/index'
import { GEOFENCER_BASE_PATH } from './../Config';
const Axios = require('axios')

export class MainProject implements IDatasource {
  public id = 'project-datasource';
  
  private restClient : ManagementApi;

  constructor() {
    const url = GEOFENCER_BASE_PATH;
    this.restClient = new ManagementApi(undefined,  url, undefined);
  }

  public async GetAnalyseRule(ruleId : string) {
    // Do REST call to server
    return await this.restClient.getAnalyseRule(ruleId);
  }

  public async GetRules() {
    // Do REST call to server
    return await this.restClient.getRules();
  }


  public async GetTemplateGeofencerDefinition() {
    const url = `${GEOFENCER_BASE_PATH}/geofencerdef.json`;
    Axios.get(url)
.then(function (response : any) {
  console.log(response);
})
.catch(function (error : any) {
  console.log(error);
});
  }

  public async execute(): Promise<any> {
    return this;
  }

  public async SetGeofencerDefinition(geofencerDef : string) {
    const definition : FakeGeoJSONEnvelopeInterface = {
      Message: geofencerDef
    };
      return await this.restClient.setGeofencerDefinition(definition);
  }

  public async SendSimulatorItemTestData(items_as_json : string) {
    const testData : SimulationTestData = {
      JsonTextItemArray: items_as_json
    };
      return await this.restClient.sendSimulationTestData(testData);
  }
}
