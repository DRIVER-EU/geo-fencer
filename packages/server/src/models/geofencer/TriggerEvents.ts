import { TriggerArea } from "./TriggerArea";
import { ItemInterface } from "../avro/eu/driver/model/sim/entity/Item";

export interface IGeoFencerTrigger {
    OnChangeTrigger: (rule : TriggerArea, simItem : ItemInterface,  hit : boolean, initial : boolean) => void;
    //OnExitTrigger: (area : TriggerArea) => void;
}