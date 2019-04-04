// tslint:disable
import { BaseAvroRecord } from "../../../../BaseAvroRecord";

export interface BaseInterface {
    guid: string;
    name: string;
    owner: string;
}

export class Base extends BaseAvroRecord implements BaseInterface {

    public static readonly subject: string = "Base";
    public static readonly schema: object = {
    "name": "Base",
    "namespace": "eu.driver.model.sim",
    "doc": "ABSTRACT, do not use this record in general, the fields are incorporated inside all sub classes!! *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
    "type": "record",
    "fields": [
        {
            "name": "guid",
            "doc": "globally unique identifier for this entity/connection",
            "type": "string"
        },
        {
            "name": "name",
            "doc": "name of this entity/connection",
            "type": "string"
        },
        {
            "name": "owner",
            "doc": "identifier of the simulator currently responsible for this entity/connection",
            "type": "string"
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): Base {
        const result = new Base();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public name!: string;
    public owner!: string;

    public schema(): object {
        return Base.schema;
    }

    public subject(): string {
        return Base.subject;
    }
}
