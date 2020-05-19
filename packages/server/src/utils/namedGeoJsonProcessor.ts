// Based on https://github.com/DRIVER-EU/csCOP/blob/master/website/test-bed/geoJsonProcessor.ts#L43

import { IGeoJSONEnvelope, IFeatureCollection, IFeature, IPoint,  ILineString, IMultiLineString, IPolygon, IMultiPolygon } from './../models/avro_generated/eu/driver/model/geojson/standard_named_geojson-value';
import {Logger} from 'node-test-bed-adapter';
import * as _ from 'underscore';

// The JSON parser that parses the AVRO JSON schema's fails on ambiguity on map keys/values; correct this



interface PropertyDictionary {
    [propKey: string]: null | undefined | boolean | string | number;
}

export abstract class NamedGeoJsonProcessor {
    private static log = Logger.instance;

    constructor() {}

    // When JSON is parsed and there are multiple datatype values possible a wrapper is created (called Branch$)
    // This wrapper object contains the type and the value
    // The generated interface doesn't expect wrapper object, so remove them!
    public static fixParseErrors(geoJsonMsg: any): IGeoJSONEnvelope | null {
        let result = <IGeoJSONEnvelope> {};
        if (_.isObject(geoJsonMsg) && !geoJsonMsg.hasOwnProperty('geojson')) {
            throw Error('geojson property missing');
        }

        if (geoJsonMsg) {
            result.geojson =  this.convertFeatureCollection(geoJsonMsg.geojson);
            if (_.isObject(geoJsonMsg) && geoJsonMsg.hasOwnProperty('properties')) {
                result.properties = this.convertProperties(geoJsonMsg.properties);
            } else {
                result.properties = null;
            }
        }
        return result;
    }


    private static convertProperties(geojsonMessage: any): any {
        let map: PropertyDictionary = { };
        for (const key in geojsonMessage) {
            const value = geojsonMessage[key];
            if (value.hasOwnProperty('string')) {
                map[key] = value.string;
            } else if (value.hasOwnProperty('int')) {
                map[key] = value.int;
            } else map[key] = value;
            // console.log(`${key} -> ${value}`);
         }
         return map;
    }

    private static convertFeatureCollection(featureCollection: any): IFeatureCollection {
        let fc = <IFeatureCollection> {};
        fc.type = featureCollection.hasOwnProperty('type') ? featureCollection.type : null;
        fc.bbox = featureCollection.hasOwnProperty('box') ? featureCollection.box : null;
        fc.features = featureCollection.hasOwnProperty('features') ? this.convertFeatureArray(featureCollection.features) : null;
        return fc;
    }

    private static convertFeatureArray(features: any[]): IFeature[] {
        let fc = <IFeature[]> [];
        for (let feature of features) {
            let f = <IFeature> {};
            f.type = feature.hasOwnProperty('type') ? feature.type : null;
            f.bbox = feature.hasOwnProperty('bbox') ? feature.bbox : null;
            f.geometry = feature.hasOwnProperty('geometry') ? this.convertGeometry(feature.geometry) : null;
            f.properties = feature.hasOwnProperty('properties') ? this.convertProperties(feature.properties) : null;
            fc.push(f);
        }
        return fc;
    }


    private static convertGeometry(geometry: any): any { // IPoint | ILineString | IMultiLineString | IPolygon | IMultiPolygon {
         if (geometry.hasOwnProperty('eu.driver.model.geojson.Polygon')) {
           return geometry['eu.driver.model.geojson.Polygon'] as IPolygon;
         } else if (geometry.hasOwnProperty('eu.driver.model.geojson.Point')) {
            return geometry['eu.driver.model.geojson.Point'] as IPoint;
         } else return geometry;
    }
/*
    private tryParsing(data: string) {
        var ftCollection;
        try {
            ftCollection = JSON.parse(data) as IGeoJson;
        } catch (error) {
            this.log.error(`Error parsing geojson message: ${error}`);
        }
        return ftCollection;
    }

    private fixAvroMessage(ftCollection: IGeoJson): IGeoJson {
        if (ftCollection.features.hasOwnProperty('array')) {
            ftCollection.features = ftCollection.features['array'];
        }
        if (_.isArray(ftCollection.features)) {
            ftCollection.features.forEach(f => {
                this.fixGeometry(f);
                this.addGuid(f);
                this.splitSubentities(f);
            });
        }
        return ftCollection;
    }

    private fixGeometry(f: Feature) {
        if (f.geometry.hasOwnProperty('eu.driver.model.geojson.Point')) {
            f.geometry = f.geometry['eu.driver.model.geojson.Point'];
        } else if (f.geometry.hasOwnProperty('eu.driver.model.geojson.sim.Point')) {
            f.geometry = f.geometry['eu.driver.model.geojson.sim.Point'];
        }
    }

    private addGuid(f: Feature) {
        if (f.properties && f.properties[ID_PROPERTY]) {
            f.id = f.properties[ID_PROPERTY];
        }
    }

    private splitSubentities(f: Feature) {
        if (!f.properties || !f.properties[SUBENTITIES_PROPERTY]) return;
        let subEntities = f.properties[SUBENTITIES_PROPERTY];
        if (!_.isArray(subEntities)) return;
        // subEntities.forEach(se => f.properties[SUBENTITIES_FEATURE_PROPERTY] = se);
        //TODO: show all subEntities
        f.properties[SUBENTITIES_FEATURE_PROPERTY] = subEntities;
    }

    */
}