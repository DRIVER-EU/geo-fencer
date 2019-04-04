// tslint:disable
import { BaseAvroRecord } from "../../../../../BaseAvroRecord";

export interface Location {
    latitude: number;
    longitude: number;
    altitude?: null | number;
}

export interface RequestUnitTransportInterface {
    guid: string;
    owner: string;
    unit: string;
    destination: string;
    route?: null | Location[];
}

export class RequestUnitTransport extends BaseAvroRecord implements RequestUnitTransportInterface {

    public static readonly subject: string = "RequestUnitTransport";
    public static readonly schema: object = {
    "name": "RequestUnitTransport",
    "namespace": "eu.driver.model.sim.request",
    "doc": "Request for transporting a complete unit. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*",
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
            "name": "unit",
            "doc": "Globally unique identifier for the unit that should transport",
            "type": "string"
        },
        {
            "name": "destination",
            "doc": "Globally unique identifier for the station that should be the destination",
            "type": "string"
        },
        {
            "name": "route",
            "doc": "List of locations that describes the route towards the destination",
            "type": [
                "null",
                {
                    "type": "array",
                    "items": {
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
                }
            ],
            "default": null
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): RequestUnitTransport {
        const result = new RequestUnitTransport();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public guid!: string;
    public owner!: string;
    public unit!: string;
    public destination!: string;
    public route?: null | Location[] = null;

    public schema(): object {
        return RequestUnitTransport.schema;
    }

    public subject(): string {
        return RequestUnitTransport.subject;
    }
}
