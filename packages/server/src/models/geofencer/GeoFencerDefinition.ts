import { IGeoJSONEnvelope } from '../avro_generated/eu/driver/model/geojson/standard_named_geojson-value';
import { TriggerArea } from './TriggerArea';
import { IItem } from './../../models/avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';
import { IGeoFencerTrigger } from './TriggerEvents';
import { ILogService } from 'src/services/log-service';

/*
Convert GeoJSONEnvelope to list of trigger areas
*/
export class GeoFencerDefinition {

    private readonly PropertyNameID = 'ID';
    private readonly PropertyNameType = 'Type';
    private readonly PropertyNameTitle = 'Title';

    public triggerAreas: TriggerArea[] = [];
    private definition: IGeoJSONEnvelope;


    constructor(
        public logService: ILogService,
        geoFencerDefinition: IGeoJSONEnvelope) {
        if (!geoFencerDefinition) throw new Error('Can not load GeoFencer definition when null.');
        if ((!geoFencerDefinition.properties) ||
            (!geoFencerDefinition.properties.hasOwnProperty(this.PropertyNameID)) ||
            (!geoFencerDefinition.properties.hasOwnProperty(this.PropertyNameType))) {
            throw new Error(`The GeoJSON Properties "${this.PropertyNameID}"="<unique id>" and "${this.PropertyNameType}"="GeoFencerDefinition" are mandatory in GeoFencer definition.`);
        }
        const geoJsonType: string = geoFencerDefinition.properties[this.PropertyNameType] as string || '';

        if ((geoJsonType.toLocaleUpperCase() !== 'GEOFENCERDEFINITION')) {
            throw new Error(`The GeoJSON property "${this.PropertyNameType}" in the GeoFencerDefinition must have value "GeoFencerDefinition".`);
        }

        const ID: string = geoFencerDefinition.properties[this.PropertyNameID] as string;
        const Title: string = geoFencerDefinition.properties.hasOwnProperty(this.PropertyNameTitle) ? geoFencerDefinition.properties[this.PropertyNameTitle] as string : '';

        this.definition = geoFencerDefinition;
        logService.LogMessage(`Load Geo Fencer Definition "${Title}" with ID "${ID}".`);
        if ((geoFencerDefinition.geojson) && (geoFencerDefinition.geojson.features)) {
            this.triggerAreas =
                geoFencerDefinition.geojson.features.map(area => new TriggerArea(this, area));
        } else logService.LogMessage('No geofencer rules defined in GeoFencer definition');

    }

    private ValidateHeaderGeoFencerDefintion(geoFencerDefinition: IGeoJSONEnvelope) {

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
        let id = (this.definition.properties) ? this.definition.properties['ID'] : null;
        return (id) ? id + '' : '<unknown>';
    }
}