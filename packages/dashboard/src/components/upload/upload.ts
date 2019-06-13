import { WidgetBase } from "@csnext/cs-client";
import FileSaver from "file-saver";
import Component from "vue-class-component";
import { GEOFENCER_BASE_PATH } from "./../../Config";
import { MainProject } from "./../../datasources/MainProject";
import { Prop } from "vue-property-decorator";
import "./upload.css";

@Component({
    components: {},
    name: "upload",
    template: require("./upload.html"),
} as any)
export class Upload extends WidgetBase {
    public errorMsg: string | null = null;

    public useKafka: boolean = true;

    @Prop({ required: true }) public provider!: MainProject;

    constructor() {
        super();

    }

    public LoadGeoFencerDefinitionFromFile(ev: any) {
        // const file  = this.$refs.geofencerDefFile.files[0];
        const file = ev.target.files[0];
        const reader = new FileReader();
        ev.target.value = "";
        reader.onload = () => {
            debugger;
            if (this.provider) {
                this.provider.SetGeofencerDefinition(reader.result as string, this.useKafka)
                    .then(() => {
                        // this.GetRulesFromServer();
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
                this.provider.SendSimulatorItemTestData(reader.result as string, this.useKafka)
                    .catch((error) => this.errorMsg = error);
            }
        };
        reader.readAsText(file);
    }

    public DownloadExampleGeofencerDefinition() {
        FileSaver.saveAs(`${GEOFENCER_BASE_PATH}/public/geofencerdef.json`, "geofencer-sample-rules.json");
    }

    public DownloadSampleData() {
        FileSaver.saveAs(`${GEOFENCER_BASE_PATH}/public/simitems.json`, "test_data.json");
    }
}
