import { WidgetBase } from "@csnext/cs-client";
import Component from "vue-class-component";
import { GEOFENCER_BASE_PATH } from "./../../Config";
import { Configuration, ManagementApi, ResultTestRule, TestRule } from "./../../generated_rest_api/index";
import "./sandbox-rule.css";

// Component to test geofencer rules

const simItem: string = '{ \n \
    "guid": "TEST1",\n\
    "name": "Truck_12",\n\
    "owner": "",\n\
     "location": {\n\
      "altitude": 0.0,\n\
      "longitude": 4.254193,\n\
      "latitude": 52.104876\n\
    },\n\
    "orientation": {\n\
      "pitch": 0,\n\
      "roll": 0,\n\
      "yaw": 0\n\
    },\n\
    "velocity": {\n\
      "magnitude": 0,\n\
      "pitch": 0,\n\
      "yaw": 0\n\
    },\n\
    "visibleForParticipant": false,\n\
    "movable": false,\n\
    "itemType": {\n\
	    "subType":"TRUCK"\n\
	  },\n\
    "properties": {\n\
      "ForceIdentifier": "Opposing"\n\
      "Weight": "15"\n\
    }\n\
  }';

@Component({
    components: {},
    name: "sandbox-rule",
    template: require("./sandbox-rule.html"),
} as any)
export class SandboxRule extends WidgetBase {

    public expressionText: string = "((NAME LIKE '^Truck_[0-9]{1,5}$') OR (NAME = 'TARGET'))  AND ForceIdentifier = 'Opposing' AND PROP['Weight'] > '20'";
    public testData: string = simItem;
    public errorMsg: string = "";
    public restCallCompleted = false;
    public expressionHasErrors = false;
    public substitudedExpression = "";
    public expressionError = "";
    public expressionOutcome: boolean = false;
    private restClient: ManagementApi;

    constructor() {
        super();
        const url = GEOFENCER_BASE_PATH;
        this.restClient = new ManagementApi(undefined, url, undefined);
    }

    public TestRule() {
        this.restCallCompleted = false;
        const ruleData: TestRule = {
            Expression: this.expressionText,
            Item: this.testData,
        };
        this.restClient.doTestRule(ruleData)
            .then((testResult: ResultTestRule) => {
                this.errorMsg = "";
                this.expressionHasErrors = testResult.HasError;
                this.substitudedExpression = testResult.Substituded;
                this.expressionError = testResult.ErrorMsg;
                this.expressionOutcome = testResult.ExpressionResult;
                this.restCallCompleted = true;
            }).catch((error) => {
                this.restCallCompleted = false;
                this.errorMsg = "Request to server failed.";
            });
    }
}
