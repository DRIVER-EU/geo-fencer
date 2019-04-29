import './rule-fire-events.css';
import Component from 'vue-class-component';
import { WidgetBase } from '@csnext/cs-client';
import { NotificationService } from './../../services/notification_service'
import { RuleFireInfo } from './../../models/rule_fire_info'

@Component({
    name: 'rule-fire-events',
    components: {},
    template: require('./rule-fire-events.html')
} as any)
export class RuleFireEvents extends WidgetBase {
    
    public rulesFired: Array<RuleFireInfo> = [];
    constructor() {
        super();
        this.$set(this, 'rulesFired', NotificationService.getInstance().rulesFired._queue);
        
    }

    public fields = [
        { key: 'ruleId', label: 'Rule ID'},
        { key: 'simItemGuid', label: 'Sim ID', },
        { key: 'hit', label: 'HIT', },

    ]



}