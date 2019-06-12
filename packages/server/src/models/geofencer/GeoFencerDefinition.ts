import { IGeoJSONEnvelope } from '../avro_generated/eu/driver/model/geojson/standard_named_geojson-value';
import { TriggerArea } from './TriggerArea';
import { IItem } from './../../models/avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';
import {  IGeoFencerTrigger } from './TriggerEvents';
import { ILogService } from 'src/services/log-service';

/*
Convert GeoJSONEnvelope to list of trigger areas
*/
export class GeoFencerDefinition {

    public triggerAreas: TriggerArea[] = [];
    private geoFencerDefinition: IGeoJSONEnvelope;


    constructor(
        public logService: ILogService,
        geoFencerDefinition: IGeoJSONEnvelope) {
        this.geoFencerDefinition = geoFencerDefinition;
        if ((geoFencerDefinition.geojson) && (geoFencerDefinition.geojson.features)) {
           this.triggerAreas =
               geoFencerDefinition.geojson.features.map(area => new TriggerArea(this, area));
        }

    }

    get LogService() { return this.logService; }

    // Check for all rules if the rule state changed, and report this.
    public ValidateAgainstAllRules(simItem: IItem, callback: IGeoFencerTrigger, isTestData = false) {
        this.triggerAreas.forEach(function (triggerArea: TriggerArea) {
            triggerArea.ValidateAgainstRule(simItem, callback, isTestData);
        });
    }

    public SimulationItemDeleted(guid: string) {
        this.triggerAreas.forEach(function (triggerArea: TriggerArea) {
            triggerArea.SimulationItemDeleted(guid);
        });
    }

    public GetGeoFencerDefinitionId(): string {
        let id = (this.geoFencerDefinition.properties) ? this.geoFencerDefinition.properties['ID'] : null;
        return (id) ? id + '' : '<unknown>';
    }
}