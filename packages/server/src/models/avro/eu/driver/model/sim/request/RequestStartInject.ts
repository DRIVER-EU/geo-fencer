// tslint:disable
import { BaseAvroRecord } from "../../../../../BaseAvroRecord";

export interface RequestStartInjectInterface {
    guid: string;
    owner: string;
    inject: string;
}

export class RequestStartInject extends BaseAvroRecord implements RequestStartInjectInterface {

    public static readonly subject: string = "RequestStartInject";
    public static readonly schema: object = {
    "name": "RequestStartInject",
    "namespace": "eu.driver.model.sim.request",
    "doc": "Request for starting a simulation inject. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
    "type": "record",
    "fields": [
        {
            "name": "guid",
            "doc": "Globally unique identifier for this request",
            "type": "string"
        },
        {
            "name": "owner",
            "doc": "Identifier of the simulator currently responsible for this request",
            "type": "string"
        },
        {
            "name": "inject",
            "doc": "Name of the inject that needs to be started",
            "type": "string"
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): RequestStartInject {
        const result = new RequestStartInject();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public owner!: string;
    public inject!: string;

    public schema(): object {
        return RequestStartInject.schema;
    }

    public subject(): string {
        return RequestStartInject.subject;
    }
}
