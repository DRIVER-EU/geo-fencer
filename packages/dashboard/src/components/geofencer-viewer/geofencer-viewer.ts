import './geofencer-viewer.css';
import { saveAs } from 'file-saver';
import { RuleFireEvents } from './../rule-fire-events/rule-fire-events'
import { ServerStatus } from './../server-status/server-status';
import { SandboxRule } from './../sandbox-rule/sandbox-rule';
import { RuleDetail } from './../rule-detail/rule.detail';
import { RulesResult, AnalyseRuleResult } from './../../generated_rest_api/api';
import { WidgetBase, AppState } from '@csnext/cs-client';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { MainProject } from './../../datasources/MainProject';
import { GeoFencerRule } from './../../generated_rest_api/index';

import { GEOFENCER_BASE_PATH } from './../../Config';
var FileSaver = require('file-saver');

@Component({
  name: 'geofencer-viewer',
  components: {  SandboxRule, RuleDetail, ServerStatus, RuleFireEvents },
  template: require('./geofencer-viewer.html')
} as any)
export class GeoFencerViewer extends WidgetBase {

  public isLoading: boolean = false;
  public errorMsg: string | null = null;
  public rulesResult: RulesResult = <RulesResult>{ Rules: [] };

  private provider: MainProject | undefined;
  
  private selectedRule : GeoFencerRule | null = null;
  public currentPage = 1;
  public perPage = 5;

  get ExampleRulesUrl() : string {
    return `${GEOFENCER_BASE_PATH}/public/geofencerdef.json`;
  }

  get ExampleTestData() : string {
    return `${GEOFENCER_BASE_PATH}/public/simitems.json`;
  }
 


  get totalRows() {
    return (this.rulesResult.Rules.length);
  }

  get SelectedRule() : GeoFencerRule | null {
    return this.selectedRule;
  }

  set SelectedRule(value : GeoFencerRule | null)  {
    this.$set(this, 'selectedRule', value);
  }
  


  constructor() {
    super();
    
  }

  @Watch('widget.content', { deep: false })
  public contentChanged() {
    // Datasource is now set, get it
    this.provider = this.widget.content as MainProject;
    this.GetRulesFromServer();
  }

  public rowSelected(selectedRules: GeoFencerRule[]) {
    this.SelectedRule = selectedRules[0];
  }

  // Get all rules from GeoFencer service    
  private async GetRulesFromServer() {
    this.errorMsg = null;
    if (this.provider) {
      this.isLoading = true;
      await this.provider.GetRules()
        .then((ruleSet: RulesResult) => {
         
          this.rulesResult.Rules.length = 0;
          this.rulesResult.Rules.push(...ruleSet.Rules);
        })
        .catch(error => {
          this.errorMsg = `Communication failure with server (${this.provider ? this.provider.GetBaseServerUrl() : 'no server defined'}).`;
        })
        .finally(() => this.isLoading = false);
    } else this.errorMsg = "No provider";
  }

  RefreshTable(event: any) {
    this.GetRulesFromServer();
  }


  // Columns in rules table (type GeoFencerRule)
  public rulesTableColumns = [
    { key: 'UserAssignedId', label: 'Identifier', sortable: true, sortDirection: 'desc', 'class': 'tabelCellId', },
    { key: 'Rule', label: 'Rule', sortable: true },
   
  ]





  public getRowClass(item: any, type: any) {
    //if (!item) return;
    // return (item.IsValid) ? 'rowvalid' : 'rowinvalid'
    return;
  }

  LoadGeoFencerDefinitionFromFile(ev : any) {
    //const file  = this.$refs.geofencerDefFile.files[0];
    const file = ev.target.files[0];
    const reader = new FileReader();
    ev.target.value = '';
    reader.onload = (e : any) => {
      if (this.provider) {
        this.provider.SetGeofencerDefinition(reader.result as string)
        .then(result => { this.GetRulesFromServer(); })
        .catch(error => this.errorMsg = error );
      }
    }
    reader.readAsText(file);
  }

  LoadSimTestDataFromFile(ev : any) {
    //const file  = this.$refs.geofencerDefFile.files[0];
    const file = ev.target.files[0];
    const reader = new FileReader();
    ev.target.value = '';
    reader.onload = (e : any) => {
      if (this.provider) {
        this.provider.SendSimulatorItemTestData(reader.result as string)
        .then(result => { })
        .catch(error => this.errorMsg = error );
      }
    }
    reader.readAsText(file);
  }


  DownloadExampleGeofencerDefinition() {
    FileSaver.saveAs(this.ExampleRulesUrl, "geofencer-sample-rules.json");
  }

  DownloadSampleData() {
    FileSaver.saveAs(this.ExampleTestData, "test_data.json");
  }

}
