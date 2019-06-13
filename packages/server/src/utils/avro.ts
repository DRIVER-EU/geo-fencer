// copied from https://github.com/DRIVER-EU/node-test-bed-adapter/blob/master/src/lib/avro/utils.ts
// Extended with named GeoJSON

import { IFeatureCollection, IGeoJSONEnvelope } from './../models/avro_generated/eu/driver/model/geojson/standard_named_geojson-value';
import { IItem } from './../models/avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';

/**
 * Deep copy function for TypeScript.
 * @param T Generic type of target/copied value.
 * @param target Target value to be copied.
 * @see Source project, ts-deepcopy https://github.com/ykdr2017/ts-deepcopy
 * @see Code pen https://codepen.io/erikvullings/pen/ejyBYg
 */
export const deepCopy = <T>(target: T): T => {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  if (target instanceof Array) {
    const cp = [] as any[];
    (target as any[]).forEach(v => {
      cp.push(v);
    });
    return cp.map((n: any) => deepCopy<any>(n)) as any;
  }
  if (typeof target === 'object' && target !== {}) {
    const cp = { ...(target as { [key: string]: any }) } as {
      [key: string]: any;
    };
    Object.keys(cp).forEach(k => {
      cp[k] = deepCopy<any>(cp[k]);
    });
    return cp as T;
  }
  return target;
};

/** Returns true if the input is an integer */
export const isInt = (n: number | string | boolean) => Number(n) === n && n % 1 === 0;

/** Returns true if the input is a float */
export const isFloat = (n: number | string | boolean) => Number(n) === n && n % 1 !== 0;

export const simItem = (simItem?: IItem) => {
    if (!simItem) {
      return;
    }
    const avro = {
        properties:  ((simItem) && (simItem.properties)) ? mapToAvro(simItem.properties) : {},
        guid: simItem.guid,
        name: simItem.name,
        owner: simItem.owner,  
    } as { [key: string]: any };
    return avro;
};

/** Convert a Named GeoJSON to an AVRO representation */
export const namedGeojsonToAvro = (named_geojson?: IGeoJSONEnvelope) => {
    if (!named_geojson) {
      return;
    }
    const avro = {
        properties:  ((named_geojson) && (named_geojson.properties)) ? mapToAvro(named_geojson.properties) : {},
        geojson: geojsonToAvro(named_geojson.geojson)
    } as { [key: string]: any };
    return avro;
};

/** Convert a GeoJSON to an AVRO representation */
export const geojsonToAvro = (geojson?: IFeatureCollection) => {
  if (!geojson) {
    return;
  }
  const avro = { type: 'FeatureCollection' } as { [key: string]: any };
  if (geojson.bbox) {
    avro.bbox = geojson.bbox.map(b => b);
  }
  if (geojson.features) {
    avro.features = geojson.features.map(f => {
      const avroFeature = {} as { [key: string]: any };
      if (f && f.geometry && Object.keys(f.geometry).length > 1) {
        avroFeature.geometry = {
          [`eu.driver.model.geojson.${f.geometry.type}`]: deepCopy(f.geometry),
        } as { [key: string]: any };
      }
      avroFeature.properties = mapToAvro(f.properties);
      return avroFeature;
    });
  }
  return avro;
};

/** Convert a flat object to an AVRO representation, where all numbers will either be int or double. */
export const mapToAvro = (props: { [key: string]: any } | null) =>
  props && Object.keys(props).length > 0
    ? Object.keys(props).reduce(
        (acc, key) => {
          const val = props[key];
          acc[key] = {} as { [key: string]: any };
          if (typeof val === 'object') {
            acc[key].string = JSON.stringify(val);
          } else if (typeof val === 'number') {
            acc[key][isInt(val) ? 'int' : 'double'] = val;
          } else {
            acc[key][typeof val] = val;
          }
          return acc;
        },
        {} as { [key: string]: any }
      )
    : props;