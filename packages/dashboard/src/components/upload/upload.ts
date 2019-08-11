import { WidgetBase } from "@csnext/cs-client";
import FileSaver from "file-saver";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { GEOFENCER_BASE_PATH } from "./../../Config";
import { MainProject } from "./../../datasources/MainProject";
import "./upload.css";

@Component({
    components: {},
    name: "upload",
    template: require("./upload.html"),
} as any)
export class Upload extends WidgetBase {
    public errorMsg: string | null = null;
    public statusMsg: string | null = null;

    public useKafka: boolean = true;

    @Prop({ required: true }) public provider!: MainProject;

    constructor() {
        super();
    }

    public LoadGeoFencerDefinitionFromFile(ev: any) {
        // const file  = this.$refs.geofencerDefFile.files[0];
        this.ResetMessage();
        const file = ev.target.files[0];
        const reader = new FileReader();
        ev.target.value = "";
        reader.onload = () => {
            if (this.provider) {
                this.provider.SetGeofencerDefinition(reader.result as string, this.useKafka)
                    .then(() => {
                        this.statusMsg = this.useKafka ?
                           "Geo fencer definition queued on KAFKA (see log server)." :
                           "Geo fencer definition uploaded to server and applied. ";
                        // this.GetRulesFromServer();
                    }).catch((error: Response) => {
                        this.errorMsg = error.statusText;
                        error.json().then((json) => this.errorMsg = `${error.statusText}: ${json.errorMsg}`);
                    });
            }
        };
        reader.readAsText(file);
    }

    public LoadSimTestDataFromFile(ev: any) {
        this.ResetMessage();
        // const file  = this.$refs.geofencerDefFile.files[0];
        const file = ev.target.files[0];
        const reader = new FileReader();
        ev.target.value = "";
        reader.onload = () => {
            if (this.provider) {
                this.provider.SendSimulatorItemTestData(reader.result as string, this.useKafka)
                    .then(() => {
                        this.statusMsg = "Simulation items uploaded to server.";
                    }).catch((error) => {
                        this.errorMsg = error;
                    });
            }
        };
        reader.readAsText(file);
    }

    public DownloadExampleGeofencerDefinition() {
        this.ResetMessage();
        FileSaver.saveAs(`${GEOFENCER_BASE_PATH}/public/geofencerdef.json`, "geofencer-sample-rules.json");
        this.statusMsg = "See download section in browser.";
    }

    public DownloadSampleData() {
        this.ResetMessage();
        FileSaver.saveAs(`${GEOFENCER_BASE_PATH}/public/simitems.json`, "test_data.json");
        this.statusMsg = "See download section in browser.";
    }

    private ResetMessage() {
        this.statusMsg = null;
        this.errorMsg = null;
    }
}
