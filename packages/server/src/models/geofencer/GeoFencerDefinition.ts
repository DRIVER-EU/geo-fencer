import { GeoJSONEnvelopeInterface } from '../avro/eu/driver/model/geojson/GeoJSONEnvelope';
import { TriggerArea } from './TriggerArea';
import { ItemInterface } from './../../models/avro/eu/driver/model/sim/entity/Item'
import {  IGeoFencerTrigger } from './TriggerEvents';
import { ILogService } from 'src/services/log-service';

/*
Convert GeoJSONEnvelope to list of trigger areas
*/
export class GeoFencerDefinition {

    public triggerAreas : TriggerArea[] = [];
    private geoFencerDefinition : GeoJSONEnvelopeInterface;


    constructor(
        public logService : ILogService,
        geoFencerDefinition : GeoJSONEnvelopeInterface) {
        this.geoFencerDefinition = geoFencerDefinition;
        if (geoFencerDefinition.geojson.features) {
           this.triggerAreas =
               geoFencerDefinition.geojson.features.map(area => new TriggerArea(this, area));
        }
        
    }

    get LogService() { return this.logService; }

    // Check for all rules if the rule state changed, and report this.
    public ValidateAgainstAllRules(simItem : ItemInterface, callback: IGeoFencerTrigger, isTestData = false) {
        this.triggerAreas.forEach(function (triggerArea : TriggerArea) {
            triggerArea.ValidateAgainstRule(simItem, callback, isTestData);
        });
    }

    public SimulationItemDeleted(guid : string) {
        this.triggerAreas.forEach(function (triggerArea : TriggerArea) {
            triggerArea.SimulationItemDeleted(guid);
        });
    }

    public GetGeoFencerDefinitionId() : string {
        let id = (this.geoFencerDefinition.properties) ? this.geoFencerDefinition.properties["ID"] : null;
        return (id) ? id + "" : "<unknown>";
    }
}