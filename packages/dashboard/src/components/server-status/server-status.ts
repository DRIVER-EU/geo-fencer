import { StatusResult } from './../../generated_rest_api/api';
import './server-status.css';
import Component from 'vue-class-component';
import { WidgetBase } from '@csnext/cs-client';
import { ManagementApi, Configuration, TestRule, ResultTestRule } from './../../generated_rest_api/index'
import { GEOFENCER_BASE_PATH } from './../../Config';
import { Prop, Watch } from 'vue-property-decorator';
import { MainProject } from './../../datasources/MainProject';

@Component({
    name: 'server-status',
    components: {},
    template: require('./server-status.html')
} as any)
export class ServerStatus extends WidgetBase {
    @Prop({ required: true }) provider!: MainProject;

    constructor() {
        super();

    }

       
    @Watch('provider', { deep: false })
    public providerAssigned() {
        this.UpdateStatus();
    }


    public errorMsg : string = "";
    public restCallCompleted = false;
    public status?: StatusResult;

    public UpdateStatus() {
        this.$set(this, 'restCallCompleted', false);
        if (this.provider) {
            this.provider.GetStatus()
            .then((status: StatusResult) => {
                this.status = status;
                this.errorMsg = "";
                this.$set(this, 'restCallCompleted', true);
            }).catch(error => {
                this.$set(this, 'restCallCompleted', false);
                this.errorMsg = "Request to server failed.";
                console.log(error);
            }). finally(() => {});
        }
    }
}
