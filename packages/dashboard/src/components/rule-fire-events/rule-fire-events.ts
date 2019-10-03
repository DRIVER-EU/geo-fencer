import { WidgetBase } from "@csnext/cs-client";
// tslint:disable-next-line: ordered-imports
import Component from "vue-class-component";
import { IRuleFireInfo } from "./../../models/rule_fire_info";
import { NotificationService } from "./../../services/notification_service";
import "./rule-fire-events.css";

@Component({
    components: {},
    name: "rule-fire-events",
    template: require("./rule-fire-events.html"),
} as any)
export class RuleFireEvents extends WidgetBase {
    public rulesFired: IRuleFireInfo[] = [];

    public fields = [
        { key: "timstamp", label: "Timestamp"},
        { key: "ruleId", label: "Rule ID"},
        { key: "simItemGuid", label: "Sim ID" },
        { key: "hit", label: "HIT" },

    ];
    constructor() {
        super();
        this.RefreshTable();
    }

    public RefreshTable() {
        this.$set(this, "rulesFired", NotificationService.getInstance().rulesFired.queue);
    }
}
