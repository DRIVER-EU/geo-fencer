
import { WidgetBase } from "@csnext/cs-client";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { MainProject } from "./../../datasources/MainProject";
import { GeoFencerRule,  ItemState } from "./../../generated_rest_api/api";
import "./rule-detail.css";

@Component({
    components: {},
    name: "rule-detail",
    template: require("./rule-detail.html"),
} as any)
export class RuleDetail extends WidgetBase {
    public ruleDetails: ItemState[] = [];
    public currentPage = 1;
    public perPage = 5;

    @Prop({ required: true }) public provider!: MainProject;

    @Prop() public rule!: GeoFencerRule;

    // Columns in analysed rule (type ItemState)
    // const dummy : ItemState | null = null;
    public ruleDetailTableColumns = [
        { key: "ItemId", label: "Item ID", sortable: true, sortDirection: "desc" },
        { key: "InGeographicArea", label: "Area" },
        { key: "IsExpressionValid", label: "Expression" },
        { key: "Substituted", label: "Substituted" },
        "actions",

    ];

    private restcallInProgress = false; // Set with Vue.set

    constructor() {
        super();

        this.RefreshRuleDetail();
    }

    @Watch("rule", { deep: false })
    public ruleChanged() {
        this.RefreshRuleDetail();
    }

    private RefreshRuleDetail() {
        this.ruleDetails = [];
        this.currentPage = 1;
        if ((this.rule) && (this.rule.IsRuleValid)) { this.GetRuleDetailsFromServer(this.rule.UniqueSystemId); }

    }

    private async GetRuleDetailsFromServer(id: string) {
        if (this.provider) {

            this.$set(this, "restcallInProgress", true);
            await this.provider.GetAnalyseRule(id).then(
                (analysedRule) => {
                    this.$set(this, "ruleDetails", analysedRule.Items);
                    // this.ruleDetails.push(...analysedRule.Items);
                },
            ).catch((error) => {
                this.ruleDetails.length = 0;
                // this.errorMsg = `Failed to get rule ${id} from server.`;
            }).finally(() => this.$set(this, "restcallInProgress", false));
        }
    }
}
