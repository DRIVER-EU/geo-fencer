import { IDatasource } from "@csnext/cs-core";
import Axios from "axios";
import { GEOFENCER_BASE_PATH } from "./../Config";
import { FakeGeoJSONEnvelopeInterface, ManagementApi, SimulationTestData } from "./../generated_rest_api/index";

export class MainProject implements IDatasource {
  public id = "project-datasource";

  private restClient: ManagementApi;

  constructor() {
    const url = GEOFENCER_BASE_PATH;
    this.restClient = new ManagementApi(undefined,  url, undefined);
  }

  public GetBaseServerUrl(): string {
    return GEOFENCER_BASE_PATH;
  }

  public async GetAnalyseRule(ruleId: string) {
    // Do REST call to server
    return this.restClient.getAnalyseRule(ruleId);
  }

  public async GetRules() {
    // Do REST call to server
    return this.restClient.getRules();
  }

  public async GetStatus() {
    return this.restClient.getStatus();
  }

  public async GetTemplateGeofencerDefinition() {
    const url = `${GEOFENCER_BASE_PATH}/geofencerdef.json`;
    Axios.get(url);
  }

  public async execute(): Promise<any> {
    return this;
  }

  public async SetGeofencerDefinition(geofencerDef: string) {
    const definition: FakeGeoJSONEnvelopeInterface = {
      Message: geofencerDef,
    };
    return this.restClient.setGeofencerDefinition(definition);
  }

  public async SendSimulatorItemTestData(jsonItems: string) {
    const testData: SimulationTestData = {
      JsonTextItemArray: jsonItems,
    };
    return this.restClient.sendSimulationTestData(testData);
  }
}
