import './sandbox-rule.css';
import Component from 'vue-class-component';
import { WidgetBase } from '@csnext/cs-client';
import { ManagementApi, Configuration, TestRule, ResultTestRule } from './../../generated_rest_api/index'
import { GEOFENCER_BASE_PATH } from './../../Config';

// Component to test geofencer rules

const simItem: string = '{ \n \
    "guid": "TEST1",\n\
    "name": "TEST2",\n\
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
    "itemType": null\n\
  }';

@Component({
    name: 'sandbox-rule',
    components: {},
    template: require('./sandbox-rule.html')
} as any)
export class SandboxRule extends WidgetBase {
    private restClient: ManagementApi;

    constructor() {
        super();
        const url = GEOFENCER_BASE_PATH;
        this.restClient = new ManagementApi(undefined, url, undefined);
    }

    public expressionText: string = "GUID = 'TEST1' AND (NAME = 'TEST2' OR GUID =  'TEST2' ) AND ObjectType = 'Vehicle'";
    public testData : string = simItem;
    public errorMsg : string = "";
    public restCallCompleted = false;
    public expressionHasErrors = false;
    public substitudedExpression = "";
    public expressionError = "";
    public expressionOutcome : boolean = false;

    public TestRule() {
        this.restCallCompleted = false;
        const ruleData: TestRule = {
            Expression: this.expressionText,
            Item: this.testData
        };
        this.restClient.doTestRule(ruleData)
            .then((testResult: ResultTestRule) => {
                this.errorMsg = "";
                this.expressionHasErrors = testResult.HasError;
                this.substitudedExpression = testResult.Substituded;
                this.expressionError = testResult.ErrorMsg;
                this.expressionOutcome = testResult.ExpressionResult;
                this.restCallCompleted = true;
            }).catch(error => {
                this.restCallCompleted = false;
                this.errorMsg = "Request to server failed.";
                console.log(error);
            }). finally(() => {});
    }
}
