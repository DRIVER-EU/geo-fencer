// tslint:disable
import { BaseAvroRecord } from "../../../../../BaseAvroRecord";
import { ObjectSubType } from "./ObjectSubTypeEnum";
import { PersonSubType } from "./PersonSubTypeEnum";
import { VehicleSubType } from "./VehicleSubTypeEnum";
import { EnvironmentSubLabel } from "./EnvironmentSubLabelEnum";
import { IncidentSubLabel } from "./IncidentSubLabelEnum";
import { RescueSubLabel } from "./RescueSubLabelEnum";

export interface Location {
    latitude: number;
    longitude: number;
    altitude?: null | number;
}

export interface Orientation {
    yaw: number;
    pitch: number;
    roll: number;
}

export interface Velocity {
    yaw: number;
    pitch: number;
    magnitude: number;
}

export interface ObjectType {
    subType: ObjectSubType;
}

export interface PersonType {
    gender: PersonSubType;
}

export interface VehicleType {
    subType: VehicleSubType;
}

export interface EnvironmentLabel {
    subLabel: EnvironmentSubLabel;
}

export interface IncidentLabel {
    subLabel: IncidentSubLabel;
}

export interface RescueLabel {
    subLabel: RescueSubLabel;
}

export interface ItemInterface {
    guid: string;
    name: string;
    owner: string;
    location: Location;
    orientation: Orientation;
    velocity: Velocity;
    visibleForParticipant: boolean;
    movable: boolean;
    itemType?: null | ObjectType | PersonType | VehicleType;
    scenarioLabel?: null | EnvironmentLabel | IncidentLabel | RescueLabel;
    userTags?: null | string[];
    physicalConnections?: null | string[];
    group?: null | string;
    formation?: null | string;
    unit?: null | string;
}

export class Item extends BaseAvroRecord implements ItemInterface {

    public static readonly subject: string = "Item";
    public static readonly schema: object = {
    "name": "Item",
    "namespace": "eu.driver.model.sim.entity",
    "doc": "Common Simulation Space Item, representing a visual entity inside the simulation world. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
    "type": "record",
    "fields": [
        {
            "name": "guid",
            "doc": "Globally unique identifier for this entity",
            "type": "string"
        },
        {
            "name": "name",
            "doc": "Name of this entity",
            "type": "string"
        },
        {
            "name": "owner",
            "doc": "Identifier of the simulator currently responsible for this entity",
            "type": "string"
        },
        {
            "name": "location",
            "doc": "Location of this item",
            "type": {
                "name": "Location",
                "namespace": "eu.driver.model.sim.geo",
                "doc": "WGS84-based standard representation of a location on earth",
                "type": "record",
                "fields": [
                    {
                        "name": "latitude",
                        "doc": "Latitude in degrees (-90, 90] - 0 is equator",
                        "type": "double"
                    },
                    {
                        "name": "longitude",
                        "doc": "Longitude in degrees (-180, 180] - 0 is line [geographic north - Greenwich - geographic south]",
                        "type": "double"
                    },
                    {
                        "name": "altitude",
                        "doc": "Altitude in meters - 0 is surface of WGS84-based ellipsoid",
                        "type": [
                            "null",
                            "double"
                        ],
                        "default": null
                    }
                ]
            }
        },
        {
            "name": "orientation",
            "doc": "Orientation of this item",
            "type": {
                "name": "Orientation",
                "namespace": "eu.driver.model.sim.geo",
                "doc": "WGS84/Aviation-based representation of an orientation on earth - Right-handed item-specific reference system, with in base-setting heading/yaw-axis pointing down (to the centre of the earth), pitch-axis pointing to the right, roll/bank-axis pointing forward",
                "type": "record",
                "fields": [
                    {
                        "name": "yaw",
                        "doc": "Yaw or heading in degrees [0, 360) - 0 is pointing towards geographic north - yaw of 90 is EAST, yaw of 270 is WEST",
                        "type": "double"
                    },
                    {
                        "name": "pitch",
                        "doc": "Pitch in degrees (-90, 90] - 0 is perpendicular to line [origin of item - centre of WGS84-based ellipsoid] - pitch of +45 is 45 degrees pointing upwards, -45 is 45 degrees pointing downwards",
                        "type": "double"
                    },
                    {
                        "name": "roll",
                        "doc": "Roll or bank in degrees (-180, 180] - 0 is perpendicular to line [origin of item - centre of WGS84-based ellipsoid] - bank of +45 is 45 degrees roll to the right, -45 is 45 degrees roll to the left",
                        "type": "double"
                    }
                ]
            }
        },
        {
            "name": "velocity",
            "doc": "Movement vector of the item, including the magnitude",
            "type": {
                "name": "Velocity",
                "namespace": "eu.driver.model.sim.geo",
                "doc": "WGS84/Aviation-based representation of a velocity vector. Right-handed item-specific reference system, with in base-setting heading/yaw-axis pointing down (to the centre of the earth), pitch-axis pointing to the right, roll/bank-axis pointing forward",
                "type": "record",
                "fields": [
                    {
                        "name": "yaw",
                        "doc": "Yaw or heading in degrees [0, 360) - 0 is pointing towards geographic north - yaw of 90 is EAST, yaw of 270 is WEST",
                        "type": "double"
                    },
                    {
                        "name": "pitch",
                        "doc": "Pitch in degrees (-90, 90] - 0 is perpendicular to line [origin of item - centre of WGS84-based ellipsoid] - pitch of +45 is 45 degrees pointing upwards, -45 is 45 degrees pointing downwards",
                        "type": "double"
                    },
                    {
                        "name": "magnitude",
                        "doc": "Velocity in meter per second [0, inf) - 0 is standing still relative to the earth",
                        "type": "double"
                    }
                ]
            }
        },
        {
            "name": "visibleForParticipant",
            "doc": "Indication whether or not this item is visible for all participants",
            "type": "boolean"
        },
        {
            "name": "movable",
            "doc": "Indication whether or not this item is movable in the simulation world",
            "type": "boolean"
        },
        {
            "name": "itemType",
            "doc": "Concrete type of this item - can be of type ObjectType, PersonType or VehicleType",
            "type": [
                "null",
                {
                    "name": "ObjectType",
                    "namespace": "eu.driver.model.sim.entity.item",
                    "doc": "Information if the item is an object",
                    "type": "record",
                    "fields": [
                        {
                            "name": "subType",
                            "doc": "Sub type of objects that this item is",
                            "type": {
                                "name": "ObjectSubType",
                                "type": "enum",
                                "symbols": [
                                    "PROP",
                                    "TOOL"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "PersonType",
                    "namespace": "eu.driver.model.sim.entity.item",
                    "doc": "Information if the item is a person",
                    "type": "record",
                    "fields": [
                        {
                            "name": "gender",
                            "doc": "Gender of the person",
                            "type": {
                                "name": "PersonSubType",
                                "type": "enum",
                                "symbols": [
                                    "MALE",
                                    "FEMALE",
                                    "UNKNOWN"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "VehicleType",
                    "namespace": "eu.driver.model.sim.entity.item",
                    "doc": "Information if the item is a vehicle",
                    "type": "record",
                    "fields": [
                        {
                            "name": "subType",
                            "doc": "Sub type of vehicles that this item is",
                            "type": {
                                "name": "VehicleSubType",
                                "type": "enum",
                                "symbols": [
                                    "CAR",
                                    "VAN",
                                    "TRUCK",
                                    "BOAT",
                                    "PLANE",
                                    "HELICOPTER",
                                    "MOTORCYCLE"
                                ]
                            }
                        }
                    ]
                }
            ],
            "default": null
        },
        {
            "name": "scenarioLabel",
            "doc": "Scenario type of this item - can be of type EnvironmentLabel, IncidentLabel or RescueLabel",
            "type": [
                "null",
                {
                    "name": "EnvironmentLabel",
                    "namespace": "eu.driver.model.sim.entity.item",
                    "doc": "Information if the item is labeled as environment",
                    "type": "record",
                    "fields": [
                        {
                            "name": "subLabel",
                            "doc": "Sub label of environment that this item has",
                            "type": {
                                "name": "EnvironmentSubLabel",
                                "type": "enum",
                                "symbols": [
                                    "FOLIAGE",
                                    "ROAD"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "IncidentLabel",
                    "namespace": "eu.driver.model.sim.entity.item",
                    "doc": "Information if the item is labeled as incident",
                    "type": "record",
                    "fields": [
                        {
                            "name": "subLabel",
                            "doc": "Sub label of incident that this item has",
                            "type": {
                                "name": "IncidentSubLabel",
                                "type": "enum",
                                "symbols": [
                                    "FIRE",
                                    "CRASH"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "RescueLabel",
                    "namespace": "eu.driver.model.sim.entity.item",
                    "doc": "Information if the item is labeled as rescue",
                    "type": "record",
                    "fields": [
                        {
                            "name": "subLabel",
                            "doc": "Sub label of rescue that this item has",
                            "type": {
                                "name": "RescueSubLabel",
                                "type": "enum",
                                "symbols": [
                                    "POLICE",
                                    "MEDICAL",
                                    "FIRE",
                                    "SECURITY",
                                    "MILITARY"
                                ]
                            }
                        }
                    ]
                }
            ],
            "default": null
        },
        {
            "name": "userTags",
            "doc": "List of all tags the user provided associated with this item",
            "type": [
                "null",
                {
                    "type": "array",
                    "items": "string"
                }
            ],
            "default": null
        },
        {
            "name": "physicalConnections",
            "doc": "List of physical connection entities references (represented by their GUIDs) this item has",
            "type": [
                "null",
                {
                    "type": "array",
                    "items": "string"
                }
            ],
            "default": null
        },
        {
            "name": "group",
            "doc": "Reference to the group connection entity (represented by its GUID) this item is part of",
            "type": [
                "null",
                "string"
            ],
            "default": null
        },
        {
            "name": "formation",
            "doc": "Reference to the formation connection entity (represented by its GUID) this item is part of",
            "type": [
                "null",
                "string"
            ],
            "default": null
        },
        {
            "name": "unit",
            "doc": "Reference to the unit connection entity (represented by its GUID) this item is part of",
            "type": [
                "null",
                "string"
            ],
            "default": null
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): Item {
        const result = new Item();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public name!: string;
    public owner!: string;
    public location!: Location;
    public orientation!: Orientation;
    public velocity!: Velocity;
    public visibleForParticipant!: boolean;
    public movable!: boolean;
    public itemType?: null | ObjectType | PersonType | VehicleType = null;
    public scenarioLabel?: null | EnvironmentLabel | IncidentLabel | RescueLabel = null;
    public userTags?: null | string[] = null;
    public physicalConnections?: null | string[] = null;
    public group?: null | string = null;
    public formation?: null | string = null;
    public unit?: null | string = null;

    public schema(): object {
        return Item.schema;
    }

    public subject(): string {
        return Item.subject;
    }
}
