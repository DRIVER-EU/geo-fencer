// tslint:disable
import { BaseAvroRecord } from "../../../../../BaseAvroRecord";

export interface UnitConnectionInterface {
    guid: string;
    owner: string;
    mainUnit: string;
    subUnit: string;
}

export class UnitConnection extends BaseAvroRecord implements UnitConnectionInterface {

    public static readonly subject: string = "UnitConnection";
    public static readonly schema: object = {
    "name": "UnitConnection",
    "namespace": "eu.driver.model.sim.connection",
    "doc": "XVR Simulation Unit Connection - one link of the organizational structure between units, describing the connection between one main unit and one sub unit. This allows more complex structures of units. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
    "type": "record",
    "fields": [
        {
            "name": "guid",
            "doc": "Globally unique identifier for this entity",
            "type": "string"
        },
        {
            "name": "owner",
            "doc": "Identifier of the simulator currently responsible for this entity",
            "type": "string"
        },
        {
            "name": "mainUnit",
            "doc": "GUID of the unit representing the main (parent) unit",
            "type": "string"
        },
        {
            "name": "subUnit",
            "doc": "GUID of the unit representing the sub (child) unit",
            "type": "string"
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): UnitConnection {
        const result = new UnitConnection();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public owner!: string;
    public mainUnit!: string;
    public subUnit!: string;

    public schema(): object {
        return UnitConnection.schema;
    }

    public subject(): string {
        return UnitConnection.subject;
    }
}
