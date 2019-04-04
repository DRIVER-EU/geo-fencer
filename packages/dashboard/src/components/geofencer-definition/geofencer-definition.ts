[]
import './geofencer-definition.css';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Vue from 'vue';
import { WidgetBase } from '@csnext/cs-client';

@Component({
    name: 'geofencer-definition',
    components: {},
    template: require('./geofencer-definition.html')
} as any)
export class GeoFencerDefinition extends WidgetBase {

    constructor() {
        super();
    }
}
