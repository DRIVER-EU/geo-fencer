import { WidgetBase } from "@csnext/cs-client";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { GEOFENCER_BASE_PATH } from "./../../Config";
import { MainProject } from "./../../datasources/MainProject";
import { StatusResult } from "./../../generated_rest_api/api";
import { Configuration, ManagementApi, ResultTestRule, TestRule } from "./../../generated_rest_api/index";
import "./server-status.css";

@Component({
    components: {},
    name: "server-status",
    template: require("./server-status.html"),
} as any)
export class ServerStatus extends WidgetBase {
    @Prop({ required: true }) public provider!: MainProject;

    public errorMsg: string = "";
    public restCallCompleted = false;
    public status?: StatusResult;

    constructor() {
        super();

    }

    @Watch("provider", { deep: false })
    public providerAssigned() {
        this.UpdateStatus();
    }

    public UpdateStatus() {
        this.$set(this, "restCallCompleted", false);
        if (this.provider) {
            this.provider.GetStatus()
            .then((status: StatusResult) => {
                this.status = status;
                this.errorMsg = "";
                this.$set(this, "restCallCompleted", true);
            }).catch((error) => {
                this.$set(this, "restCallCompleted", false);
                this.errorMsg = "Request to server failed.";
            });
        }
    }
}
