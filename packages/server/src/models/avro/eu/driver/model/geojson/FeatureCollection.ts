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

export interface FeatureCollectionInterface {
    type: FeatureCollectionType;
    bbox?: null | number[];
    features?: null | Feature[];
}
