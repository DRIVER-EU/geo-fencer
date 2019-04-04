// tslint:disable
import { BaseAvroRecord } from "../../../../../BaseAvroRecord";
import { Enum } from "./EnumEnum";
import { Operator } from "./OperatorEnum";
import { Force } from "./ForceEnum";

export interface Globe {
}

export interface Polygon {
}

export interface LineString {
}

export interface TriggerArea {
    Area: Globe | Polygon | LineString;
}

export interface Condition {
    SimItemPropertyName: Enum;
    CompareOperator: Operator;
    SimItemPropertyValue: string;
}

export interface Notify {
    OnEnter: boolean;
    OnExit: boolean;
    OnInit: boolean;
    ReportOnlyOnce: boolean;
    MaxNumberOfNotifications?: null | number;
}

export interface LatLonLocation {
}

export interface Device {
    DeviceID: string;
    DeviceType: string;
    Description: string;
    TriggerAreas: TriggerArea[];
    Conditions: Condition[];
    Notifications: Notify;
    BelongsTo: Force;
    HotSpotLocation: LatLonLocation;
    SimItemId: string;
}

export interface GeoFencingInterface {
    ID: string;
    Description: string;
    Devices: Device[];
}

export class GeoFencing extends BaseAvroRecord implements GeoFencingInterface {

    public static readonly subject: string = "GeoFencing";
    public static readonly schema: object = {
    "type": "record",
    "name": "GeoFencing",
    "namespace": "eu.driver.model.sim.geofencing",
    "fields": [
        {
            "name": "ID",
            "type": "string"
        },
        {
            "name": "Description",
            "type": "string"
        },
        {
            "name": "Devices",
            "type": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "Device",
                    "fields": [
                        {
                            "name": "DeviceID",
                            "type": "string",
                            "doc": "Unique ID for device; will be used when reporting a hit"
                        },
                        {
                            "name": "DeviceType",
                            "type": "string",
                            "doc": "IED sensor, Near Field Sensor, etc"
                        },
                        {
                            "name": "Description",
                            "type": "string"
                        },
                        {
                            "name": "TriggerAreas",
                            "type": {
                                "type": "array",
                                "items": {
                                    "type": "record",
                                    "name": "TriggerArea",
                                    "fields": [
                                        {
                                            "name": "Area",
                                            "type": [
                                                {
                                                    "type": "record",
                                                    "name": "Globe",
                                                    "namespace": "",
                                                    "fields": []
                                                },
                                                {
                                                    "type": "record",
                                                    "name": "Polygon",
                                                    "namespace": "",
                                                    "fields": []
                                                },
                                                {
                                                    "type": "record",
                                                    "name": "LineString",
                                                    "fields": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "name": "Conditions",
                            "type": {
                                "type": "array",
                                "items": {
                                    "type": "record",
                                    "name": "Condition",
                                    "fields": [
                                        {
                                            "name": "SimItemPropertyName",
                                            "type": {
                                                "type": "enum",
                                                "name": "Enum",
                                                "namespace": "eu.driver.model.sim.geofencing",
                                                "symbols": [
                                                    "Name",
                                                    "Symbol"
                                                ]
                                            }
                                        },
                                        {
                                            "name": "CompareOperator",
                                            "type": {
                                                "type": "enum",
                                                "name": "Operator",
                                                "namespace": "eu.driver.model.sim.geofencing",
                                                "symbols": [
                                                    "Equals",
                                                    "NotEquals",
                                                    "Matches",
                                                    "NotMatches",
                                                    "InSet",
                                                    "NotInSet"
                                                ]
                                            }
                                        },
                                        {
                                            "name": "SimItemPropertyValue",
                                            "type": "string"
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "name": "Notifications",
                            "type": {
                                "type": "record",
                                "name": "Notify",
                                "fields": [
                                    {
                                        "name": "OnEnter",
                                        "type": "boolean",
                                        "doc": "Fire a notification when area is entered"
                                    },
                                    {
                                        "name": "OnExit",
                                        "type": "boolean",
                                        "doc": "Fire a notification when area is exits"
                                    },
                                    {
                                        "name": "OnInit",
                                        "type": "boolean",
                                        "doc": "Fire a notification when entity is first reported"
                                    },
                                    {
                                        "name": "ReportOnlyOnce",
                                        "type": "boolean",
                                        "doc": "When multiple entities match the condition only one notification is generated."
                                    },
                                    {
                                        "name": "MaxNumberOfNotifications",
                                        "type": [
                                            "null",
                                            "int"
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            "name": "BelongsTo",
                            "type": {
                                "type": "enum",
                                "name": "Force",
                                "namespace": "eu.driver.model.sim.geofencing",
                                "symbols": [
                                    "Hostile",
                                    "Friendly",
                                    "Neutral"
                                ]
                            }
                        },
                        {
                            "name": "HotSpotLocation",
                            "type": {
                                "type": "record",
                                "name": "LatLonLocation",
                                "fields": []
                            }
                        },
                        {
                            "name": "SimItemId",
                            "type": "string",
                            "doc": "Attached Sim Object"
                        }
                    ]
                }
            }
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): GeoFencing {
        const result = new GeoFencing();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public ID!: string;
    public Description!: string;
    public Devices!: Device[];

    public schema(): object {
        return GeoFencing.schema;
    }

    public subject(): string {
        return GeoFencing.subject;
    }
}
