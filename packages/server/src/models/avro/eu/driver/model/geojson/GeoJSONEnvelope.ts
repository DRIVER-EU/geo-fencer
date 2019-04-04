// tslint:disable
import { BaseAvroRecord } from "../../../../BaseAvroRecord";
import { FeatureCollectionType } from "./FeatureCollectionTypeEnum";
import { FeatureType } from "./FeatureTypeEnum";
import { PointType } from "./PointTypeEnum";
import { LineStringType } from "./LineStringTypeEnum";
import { MultiLineStringType } from "./MultiLineStringTypeEnum";
import { PolygonType } from "./PolygonTypeEnum";
import { MultiPolygonType } from "./MultiPolygonTypeEnum";

export interface Point {
    type: PointType;
    coordinates: number[];
}

export interface LineString {
    type: LineStringType;
    coordinates: number[][];
}

export interface MultiLineString {
    type: MultiLineStringType;
    coordinates: number[][][];
}

export interface Polygon {
    type: PolygonType;
    coordinates: number[][][];
}

export interface MultiPolygon {
    type: MultiPolygonType;
    coordinates: number[][][][];
}

export interface Feature {
    type: FeatureType;
    bbox?: null | number[];
    geometry: Point | LineString | MultiLineString | Polygon | MultiPolygon;
    properties: { [index: string]: null | boolean | string | number | number | number | number | null | boolean | string | number | number | number | number[] | { [index: string]: null | boolean | string | number | number | number | number } };
}

export interface FeatureCollection {
    type: FeatureCollectionType;
    bbox?: null | number[];
    features?: null | Feature[];
}

export interface GeoJSONEnvelopeInterface {
    properties?: null | { [index: string]: null | boolean | string | number | number | number | number };
    geojson: FeatureCollection;
}

export class GeoJSONEnvelope extends BaseAvroRecord implements GeoJSONEnvelopeInterface {

    public static readonly subject: string = "GeoJSONEnvelope";
    public static readonly schema: object = {
    "name": "GeoJSONEnvelope",
    "namespace": "eu.driver.model.geojson",
    "doc": "An envelope containing a GeoJSON FeatureCollection object, with a unique id and a title.",
    "type": "record",
    "fields": [
        {
            "name": "properties",
            "namespace": "eu.driver.model.geojson",
            "doc": "Metadata for the FeatureCollection in the geojson field.",
            "type": [
                "null",
                {
                    "name": "Json",
                    "type": "map",
                    "values": [
                        "null",
                        "boolean",
                        "string",
                        "int",
                        "long",
                        "float",
                        "double"
                    ]
                }
            ]
        },
        {
            "name": "geojson",
            "namespace": "eu.driver.model.geojson",
            "type": {
                "name": "FeatureCollection",
                "type": "record",
                "fields": [
                    {
                        "name": "type",
                        "type": {
                            "name": "FeatureCollectionType",
                            "type": "enum",
                            "symbols": [
                                "FeatureCollection"
                            ]
                        },
                        "default": "FeatureCollection"
                    },
                    {
                        "name": "bbox",
                        "type": [
                            "null",
                            {
                                "name": "BoundingBox",
                                "namespace": "eu.driver.model.geojson",
                                "doc": "The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point. The axes order of a bbox follows the axes order of geometries. The 'bbox' values define shapes with edges that follow lines of constant longitude, latitude, and elevation.",
                                "type": "array",
                                "items": "double"
                            }
                        ],
                        "default": null
                    },
                    {
                        "name": "features",
                        "type": [
                            "null",
                            {
                                "type": "array",
                                "items": {
                                    "name": "Feature",
                                    "namespace": "eu.driver.model.geojson",
                                    "doc": "A GeoJSON Feature object",
                                    "type": "record",
                                    "fields": [
                                        {
                                            "name": "type",
                                            "type": {
                                                "type": "enum",
                                                "name": "FeatureType",
                                                "symbols": [
                                                    "Feature"
                                                ]
                                            },
                                            "default": "Feature"
                                        },
                                        {
                                            "name": "bbox",
                                            "type": [
                                                "null",
                                                {
                                                    "type": "array",
                                                    "items": "double"
                                                }
                                            ],
                                            "default": null
                                        },
                                        {
                                            "name": "geometry",
                                            "type": [
                                                {
                                                    "name": "Point",
                                                    "namespace": "eu.driver.model.geojson",
                                                    "doc": "Describes a point geometry",
                                                    "type": "record",
                                                    "fields": [
                                                        {
                                                            "name": "type",
                                                            "type": {
                                                                "type": "enum",
                                                                "name": "PointType",
                                                                "symbols": [
                                                                    "Point"
                                                                ]
                                                            },
                                                            "default": "Point"
                                                        },
                                                        {
                                                            "name": "coordinates",
                                                            "type": {
                                                                "type": "array",
                                                                "items": "double"
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "LineString",
                                                    "namespace": "eu.driver.model.geojson",
                                                    "doc": "Describes a LineString geometry",
                                                    "type": "record",
                                                    "fields": [
                                                        {
                                                            "name": "type",
                                                            "type": {
                                                                "type": "enum",
                                                                "name": "LineStringType",
                                                                "symbols": [
                                                                    "LineString"
                                                                ]
                                                            },
                                                            "default": "LineString"
                                                        },
                                                        {
                                                            "name": "coordinates",
                                                            "type": {
                                                                "type": "array",
                                                                "name": "CoordinatesType",
                                                                "items": {
                                                                    "type": "array",
                                                                    "items": "double"
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "MultiLineString",
                                                    "namespace": "eu.driver.model.geojson",
                                                    "doc": "Describes a MultiLineString geometry",
                                                    "type": "record",
                                                    "fields": [
                                                        {
                                                            "name": "type",
                                                            "type": {
                                                                "type": "enum",
                                                                "name": "MultiLineStringType",
                                                                "symbols": [
                                                                    "MultiLineString"
                                                                ]
                                                            },
                                                            "default": "MultiLineString"
                                                        },
                                                        {
                                                            "name": "coordinates",
                                                            "type": {
                                                                "type": "array",
                                                                "name": "CoordinatesType",
                                                                "items": {
                                                                    "type": "array",
                                                                    "items": {
                                                                        "type": "array",
                                                                        "items": "double"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "Polygon",
                                                    "namespace": "eu.driver.model.geojson",
                                                    "doc": "Describes a Polygon geometry",
                                                    "type": "record",
                                                    "fields": [
                                                        {
                                                            "name": "type",
                                                            "type": {
                                                                "type": "enum",
                                                                "name": "PolygonType",
                                                                "symbols": [
                                                                    "Polygon"
                                                                ]
                                                            },
                                                            "default": "Polygon"
                                                        },
                                                        {
                                                            "name": "coordinates",
                                                            "type": {
                                                                "type": "array",
                                                                "name": "CoordinatesType",
                                                                "items": {
                                                                    "type": "array",
                                                                    "items": {
                                                                        "type": "array",
                                                                        "items": "double"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "MultiPolygon",
                                                    "namespace": "eu.driver.model.geojson",
                                                    "doc": "Describes a MultiPolygon geometry",
                                                    "type": "record",
                                                    "fields": [
                                                        {
                                                            "name": "type",
                                                            "type": {
                                                                "type": "enum",
                                                                "name": "MultiPolygonType",
                                                                "symbols": [
                                                                    "MultiPolygon"
                                                                ]
                                                            },
                                                            "default": "MultiPolygon"
                                                        },
                                                        {
                                                            "name": "coordinates",
                                                            "type": {
                                                                "type": "array",
                                                                "items": {
                                                                    "type": "array",
                                                                    "items": {
                                                                        "type": "array",
                                                                        "items": {
                                                                            "type": "array",
                                                                            "items": "double"
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "name": "properties",
                                            "namespace": "eu.driver.model.geojson",
                                            "doc": "Any type, without infinite nesting, should be replaced during actual usage with a record with named properties.",
                                            "type": {
                                                "name": "Json",
                                                "type": "map",
                                                "values": [
                                                    "null",
                                                    "boolean",
                                                    "string",
                                                    "int",
                                                    "long",
                                                    "float",
                                                    "double",
                                                    {
                                                        "type": "array",
                                                        "items": [
                                                            "null",
                                                            "boolean",
                                                            "string",
                                                            "int",
                                                            "long",
                                                            "float",
                                                            "double"
                                                        ]
                                                    },
                                                    {
                                                        "type": "map",
                                                        "values": [
                                                            "null",
                                                            "boolean",
                                                            "string",
                                                            "int",
                                                            "long",
                                                            "float",
                                                            "double"
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
}

    public static deserialize(buffer: Buffer, newSchema?: object): GeoJSONEnvelope {
        const result = new GeoJSONEnvelope();
        const rawResult = this.internalDeserialize(buffer, newSchema);
        result.loadValuesFromType(rawResult);

        return result;
    }

    public properties?: null | { [index: string]: null | boolean | string | number | number | number | number };
    public geojson!: FeatureCollection;

    public schema(): object {
        return GeoJSONEnvelope.schema;
    }

    public subject(): string {
        return GeoJSONEnvelope.subject;
    }
}
