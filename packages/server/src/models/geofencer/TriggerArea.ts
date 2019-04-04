import { Feature as TurfFeature, Point as TurfPoint, Polygon as TurfPolygon, MultiPolygon as TurfMultiPolygon, GeometryObject } from '@turf/turf';

import { Feature } from './../../models/avro/eu/driver/model/geojson/FeatureCollection'
import { PolygonType } from './../../models/avro/eu/driver/model/geojson/PolygonTypeEnum'
import { GeoFencerDefinition } from './GeoFencerDefinition';
import { PointType } from '../avro/eu/driver/model/geojson/PointTypeEnum';

import { EvaluateGeoFencerExpression } from './../geofencer/EvaluateGeoFencerExpression';
import { ItemInterface } from './../../models/avro/eu/driver/model/sim/entity/Item'
import { IGeoFencerTrigger } from './TriggerEvents';

import { testItemData } from './../../testdata/testdata'
var turf = require('@turf/turf');

interface ISimItemStatus {
    SubstitudedExpression: string;
    InGeographicArea: boolean;
    IsExpressionValid: boolean;
}

interface IDictionaryItem {
    key: string;
    value: ISimItemStatus
}

class NumberGenerator {
    static count: number = 1;
    constructor() {

    }

    public static GetUniqueNumber() {
        NumberGenerator.count++;
        return NumberGenerator.count;
    }
}

export class TriggerArea {

    private runtimeUniqueID: number;

    private readonly RulePropertyName = "GeoFencerRule";

    private triggerAreaTurf: TurfFeature | null = null;
    private geoFencerDef: Feature;
    private pointRadiusInMeter: number = 0;
    private evalExpression: EvaluateGeoFencerExpression | null = null;
    private owner: GeoFencerDefinition;


    private validatedItems: { [id: string]: ISimItemStatus; } = {};

    constructor(owner: GeoFencerDefinition, area: Feature) {
        this.runtimeUniqueID = NumberGenerator.GetUniqueNumber();
        this.geoFencerDef = area;
        this.owner = owner;
        this.owner.LogService.LogMessage(`Creating rule ${this.TriggerAreaId} (ID:${this.runtimeUniqueID})`);
        this.CreateTurfTriggerArea();
        this.CreateTriggerCondition();
        if (!this.ExpressionIsValid) this.owner.LogService.LogErrorMessage(`Rule ${this.runtimeUniqueID} is disabled (missing information).`);
    }

    // Get area from GeoJson Feature and convert it into (GeoJson) turf object 
    private CreateTurfTriggerArea() {
        // Propeties are not copied to turf object (it is )
        const stringify = (m: string | Object) => typeof m === 'string' ? m : JSON.stringify(m, null, 2);
        const json = stringify(this.geoFencerDef.geometry);
        if (this.geoFencerDef.geometry.type === PolygonType.Polygon) {
            if (this.geoFencerDef.geometry.coordinates[0].length >= 4) { // min 4 points for polygon mandatory
                this.triggerAreaTurf = turf.polygon(this.geoFencerDef.geometry.coordinates);
            }
        } else if (this.geoFencerDef.geometry.type === PointType.Point) {
            //this.triggerAreaTurf = turf.Point(stringify(this.geoFencerDef.geometry.coordinates));
            if (typeof this.geoFencerDef.properties["Radius"] === "number") {
                this.pointRadiusInMeter = this.geoFencerDef.properties["Radius"] as number;
            } else if (typeof this.geoFencerDef.properties["Radius"] === "string") {
                const radius = parseInt(this.geoFencerDef.properties["Radius"] as string || "0");
                if (!isNaN(radius)) {
                    this.pointRadiusInMeter = radius;

                }
                if (this.pointRadiusInMeter > 0) {
                    // Create polygon circle   (to check if point is in circle)
                    // TODO write own check in circle without polygon
                    var options = { steps: 25, units: 'meters', properties: {} };
                    this.triggerAreaTurf = turf.circle(
                        turf.point([this.geoFencerDef.geometry.coordinates[0], this.geoFencerDef.geometry.coordinates[1]]), this.pointRadiusInMeter, options);
                }
            }
        } else this.triggerAreaTurf = null;
        if (!this.triggerAreaTurf) this.LogError("No valid/usable geographic area");
    }

    // Enough information in GeoFencer defition to perform expression validation?
    get ExpressionIsValid(): boolean {
        return (this.triggerAreaTurf != null) &&
            (this.evalExpression != null) &&
            (this.evalExpression.IsValidExpression /* no parse error in expression ? */);
    }

    private CreateTriggerCondition() {
        const rule = this.geoFencerDef.properties[this.RulePropertyName] as string;
        if (rule) {
            this.evalExpression = new EvaluateGeoFencerExpression(rule);
            if (!this.evalExpression.AstTreeIsValid) {
                this.LogError(`Failed to parse rule "${rule}"\nErrors in rule:\n${this.evalExpression.ValidationsErrors}`);
            }  else {
                
                this.evalExpression.IsGeoFencerExpressionValid(testItemData,
                    (error: Error) => {
                        //this.evalExpression.
                        const expressiontext = (this.evalExpression) ? this.evalExpression.GetExpressionText() : "";
                        this.owner.LogService.LogErrorMessage(`Error ${error.message} in expression "${expressiontext}"`);
                        // this.evalExpression.IsValidExpression is now false
                    },
                    (debugInfo: string) => {
                       
                    });
            }
        } else this.owner.LogService.LogErrorMessage(`Property '${this.RulePropertyName}' not found, can not make rule`);
    }

    public SimulationItemDeleted(guid : string) {
        if (guid in this.validatedItems) delete this.validatedItems[guid];
    }

    // Checks the rule and report all state changes [In Geographic area AND Rule expression outcome ]
    public ValidateAgainstRule(simItem: ItemInterface, callback: IGeoFencerTrigger, isTestData = false) {
        if (this.ExpressionIsValid) {
            // Check if sim Item is in geographic area
            const inArea = this.IsItemInGeographicArea(simItem);
            let evaluatedExpression = "";
            // Validate the rule
            const ruleMatch = this.IsRuleMatch(simItem, debug => evaluatedExpression = debug);
            if (this.ExpressionIsValid /* error in IsRuleMatch? */ && !isTestData) {
                if (simItem.guid in this.validatedItems) {
                    // Already processed simulator Item in the past
                    const oldStatus = this.validatedItems[simItem.guid] as ISimItemStatus; // Lookup last status
                    const oldHit = oldStatus.InGeographicArea && oldStatus.IsExpressionValid;
                    const newHit = inArea && ruleMatch;
                    if (oldHit != newHit) {
                        callback.OnChangeTrigger(this, simItem, newHit, false);
                    }
                    const newStatus: ISimItemStatus = {
                        InGeographicArea: inArea,
                        IsExpressionValid: ruleMatch,
                        SubstitudedExpression: evaluatedExpression
                    };
                    this.validatedItems[simItem.guid] = newStatus;
                } else {
                    // Process for the first time
                    const newStatus: ISimItemStatus = {
                        InGeographicArea: inArea,
                        IsExpressionValid: ruleMatch,
                        SubstitudedExpression: evaluatedExpression
                    };
                    this.validatedItems[simItem.guid] = newStatus;
                    callback.OnChangeTrigger(this, simItem, inArea && ruleMatch, true);
                }
            }
        }
    }

    private IsItemInGeographicArea(simItem: ItemInterface) {
        return this.IsInGeographicArea(turf.point([simItem.location.longitude, simItem.location.latitude]))
    }


    private IsInGeographicArea(point: TurfPoint): boolean {
        // const stringify = (m: string | Object) => typeof m === 'string' ? m : JSON.stringify(m, null, 2);
        if ((this.triggerAreaTurf) && (this.triggerAreaTurf.geometry)) {
            if (this.triggerAreaTurf.geometry.type === "Polygon") {
                return turf.booleanPointInPolygon(point, this.triggerAreaTurf);
            } else return false;
        }
        return false;
    }

    private IsRuleMatch(simItem: ItemInterface, debugCallback?: (evaluatedExpression: string) => void): boolean {
        if (this.evalExpression) {
            return this.evalExpression.IsGeoFencerExpressionValid(simItem,
                (error: Error) => {
                    //this.evalExpression.
                    const expressiontext = (this.evalExpression) ? this.evalExpression.GetExpressionText() : "";
                    this.owner.LogService.LogErrorMessage(`Error ${error.message} in expression "${expressiontext}"`);

                },
                (debugInfo: string) => {
                    if (debugCallback) debugCallback(debugInfo);
                });
        }
        return false;
    }

    get TriggerAreaId(): string {
        let id = this.geoFencerDef.properties["ID"];
        return (id) ? id + "" : "<unknown>";
    }

    private LogError(msg: string) {
        this.owner.LogService.LogErrorMessage(`Error: In GeoFencer definition '${this.owner.GetGeoFencerDefinitionId()}' area '${this.TriggerAreaId}':\n * ${msg}`);
    }

    get RuntimeUniqueID(): string { return this.runtimeUniqueID + ""; }

    get ExpressionText(): string {
        return this.evalExpression ? this.evalExpression.ExpressionText : "";
    }

    get ExpressionError(): string {
        return this.evalExpression ? this.evalExpression.ValidationsErrors : "<<not assigned>>";
    }

    get IsExpressionValid(): boolean {
        return this.evalExpression ? this.evalExpression.IsValidExpression : false;
    }

    // Convert dictionary to array
    get Items(): IDictionaryItem[] {
        //return this.validatedItems;
        return Object.keys(this.validatedItems).map(dictionaryKey => {
            const res: IDictionaryItem = {
                key: dictionaryKey,
                value: this.validatedItems[dictionaryKey]
            };
            return res;
        });
    }

}