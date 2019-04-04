// tslint:disable
import { BaseAvroRecord } from "../../../../../BaseAvroRecord";
import { States } from "./StatesEnum";

export interface RequestItemChangeStateInterface {
    guid: string;
    owner: string;
    item: string;
    state: States;
}

export class RequestItemChangeState extends BaseAvroRecord implements RequestItemChangeStateInterface {

    public static readonly subject: string = "RequestItemChangeState";
    public static readonly schema: object = {
    "name": "RequestItemChangeState",
    "namespace": "eu.driver.model.sim.request",
    "doc": "Request for changing an items state. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
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
            "name": "item",
            "doc": "Globally unique identifier for the item that should change its state",
            "type": "string"
        },
        {
            "name": "state",
            "doc": "Name of the state to change to",
            "type": {
                "name": "States",
                "type": "enum",
                "symbols": [
                    "IDLE",
                    "FRIGHTENED"
                ]
            }
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): RequestItemChangeState {
        const result = new RequestItemChangeState();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public owner!: string;
    public item!: string;
    public state!: States;

    public schema(): object {
        return RequestItemChangeState.schema;
    }

    public subject(): string {
        return RequestItemChangeState.subject;
    }
}
