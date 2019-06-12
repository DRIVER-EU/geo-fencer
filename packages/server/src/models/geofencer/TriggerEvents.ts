import { TriggerArea } from './TriggerArea';
import { IItem } from '../avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';

export interface IGeoFencerTrigger {
    OnChangeTrigger: (rule: TriggerArea, simItem: IItem,  hit: boolean, initial: boolean) => void;
    // OnExitTrigger: (area : TriggerArea) => void;
}