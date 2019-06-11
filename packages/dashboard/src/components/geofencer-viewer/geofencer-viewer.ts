import { WidgetBase } from "@csnext/cs-client";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { MainProject } from "./../../datasources/MainProject";
import { RulesResult } from "./../../generated_rest_api/api";
import { GeoFencerRule } from "./../../generated_rest_api/index";
import { RuleDetail } from "./../rule-detail/rule.detail";
import { RuleFireEvents } from "./../rule-fire-events/rule-fire-events";
import { SandboxRule } from "./../sandbox-rule/sandbox-rule";
import { ServerStatus } from "./../server-status/server-status";
import "./geofencer-viewer.css";

import FileSaver from "file-saver";
import { GEOFENCER_BASE_PATH } from "./../../Config";

@Component({
  components: {  SandboxRule, RuleDetail, ServerStatus, RuleFireEvents },
  name: "geofencer-viewer",
  template: require("./geofencer-viewer.html"),
} as any)
export class GeoFencerViewer extends WidgetBase {

  get ExampleRulesUrl(): string {
    return `${GEOFENCER_BASE_PATH}/public/geofencerdef.json`;
  }

  get ExampleTestData(): string {
    return `${GEOFENCER_BASE_PATH}/public/simitems.json`;
  }

  get totalRows() {
    return (this.rulesResult.Rules.length);
  }

  get SelectedRule(): GeoFencerRule | null {
    return this.selectedRule;
  }

  set SelectedRule(value: GeoFencerRule | null)  {
    this.$set(this, "selectedRule", value);
  }

  public isLoading: boolean = false;
  public errorMsg: string | null = null;
// tslint:disable-next-line: no-object-literal-type-assertion
  public rulesResult: RulesResult = <RulesResult> { Rules: [] };
  public currentPage = 1;
  public perPage = 5;

  // Columns in rules table (type GeoFencerRule)
  public rulesTableColumns = [
    { key: "UserAssignedId", label: "Identifier", sortable: true, sortDirection: "desc", class: "tabelCellId" },
    { key: "Rule", label: "Rule", sortable: true },

  ];

  private provider: MainProject | undefined;
  private selectedRule: GeoFencerRule | null = null;

  constructor() {
    super();

  }

  @Watch("widget.content", { deep: false })
  public contentChanged() {
    // Datasource is now set, get it
    this.provider = this.widget.content as MainProject;
    this.GetRulesFromServer();
  }

  public rowSelected(selectedRules: GeoFencerRule[]) {
    this.SelectedRule = selectedRules[0];
  }

  public RefreshTable() {
    this.GetRulesFromServer();
  }

  public getRowClass() {
    // if (!item) return;
    // return (item.IsValid) ? 'rowvalid' : 'rowinvalid'
    return;
  }

  public LoadGeoFencerDefinitionFromFile(ev: any) {
    // const file  = this.$refs.geofencerDefFile.files[0];
    const file = ev.target.files[0];
    const reader = new FileReader();
    ev.target.value = "";
    reader.onload = () => {
      if (this.provider) {
        this.provider.SetGeofencerDefinition(reader.result as string)
        .then(() =>
        {
           this.GetRulesFromServer();
          }).catch(
          (error: Response) => {

            this.errorMsg = error.statusText;
          });
      }
    };
    reader.readAsText(file);
  }

  public LoadSimTestDataFromFile(ev: any) {
    // const file  = this.$refs.geofencerDefFile.files[0];
    const file = ev.target.files[0];
    const reader = new FileReader();
    ev.target.value = "";
    reader.onload = () => {
      if (this.provider) {
        this.provider.SendSimulatorItemTestData(reader.result as string)
        .catch((error) => this.errorMsg = error);
      }
    };
    reader.readAsText(file);
  }

  public DownloadExampleGeofencerDefinition() {
    FileSaver.saveAs(this.ExampleRulesUrl, "geofencer-sample-rules.json");
  }

  public DownloadSampleData() {
    FileSaver.saveAs(this.ExampleTestData, "test_data.json");
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
        .catch(() => {
          const url = this.provider ? this.provider.GetBaseServerUrl() : "no server defined";
          this.errorMsg = `Communication failure with server (${url}).`;
        })
        .finally(() => this.isLoading = false);
    } else { this.errorMsg = "No provider"; }
  }

}
