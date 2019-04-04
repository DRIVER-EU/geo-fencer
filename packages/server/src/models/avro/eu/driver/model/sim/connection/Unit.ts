// tslint:disable
import { BaseAvroRecord } from "../../../../../BaseAvroRecord";

export interface UnitInterface {
    guid: string;
    name: string;
    owner: string;
    mainItem: string;
    subItems: string[];
}

export class Unit extends BaseAvroRecord implements UnitInterface {

    public static readonly subject: string = "Unit";
    public static readonly schema: object = {
    "name": "Unit",
    "namespace": "eu.driver.model.sim.connection",
    "doc": "XVR Simulation Unit - organizational structure between items, having one main item and any number of sub items making up a unit. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
    "type": "record",
    "fields": [
        {
            "name": "guid",
            "doc": "globally unique identifier for this entity",
            "type": "string"
        },
        {
            "name": "name",
            "doc": "name of this entity",
            "type": "string"
        },
        {
            "name": "owner",
            "doc": "identifier of the simulator currently responsible for this entity",
            "type": "string"
        },
        {
            "name": "mainItem",
            "doc": "GUID of the item representing the main item of the unit",
            "type": "string"
        },
        {
            "name": "subItems",
            "doc": "GUIDs of the items representing the rest of the unit",
            "type": {
                "type": "array",
                "items": "string"
            }
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): Unit {
        const result = new Unit();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public name!: string;
    public owner!: string;
    public mainItem!: string;
    public subItems!: string[];

    public schema(): object {
        return Unit.schema;
    }

    public subject(): string {
        return Unit.subject;
    }
}
