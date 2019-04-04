// tslint:disable
import { BaseAvroRecord } from "../../../../BaseAvroRecord";

export interface ObjectDeletedInterface {
    guid: string;
    owner: string;
}

export class ObjectDeleted extends BaseAvroRecord implements ObjectDeletedInterface {

    public static readonly subject: string = "ObjectDeleted";
    public static readonly schema: object = {
    "name": "ObjectDeleted",
    "namespace": "eu.driver.model.sim",
    "doc": "Special message to indicate a particular entity/connection has been deleted. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
    "type": "record",
    "fields": [
        {
            "name": "guid",
            "doc": "globally unique identifier for the entity/connection that is deleted",
            "type": "string"
        },
        {
            "name": "owner",
            "doc": "identifier of the simulator currently responsible for this entity/connection",
            "type": "string"
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): ObjectDeleted {
        const result = new ObjectDeleted();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public owner!: string;

    public schema(): object {
        return ObjectDeleted.schema;
    }

    public subject(): string {
        return ObjectDeleted.subject;
    }
}
