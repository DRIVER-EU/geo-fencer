import { ItemInterface } from './../models/avro/eu/driver/model/sim/entity/Item';
import { ObjectDeletedInterface } from './../models/avro/eu/driver/model/sim/ObjectDeleted';
import { GeoJSONEnvelopeInterface } from './../models/avro/eu/driver/model/geojson/GeoJSONEnvelope';
import { FeatureCollectionType } from '../models/avro/eu/driver/model/geojson/FeatureCollectionTypeEnum';
import { Feature, Polygon } from '../models/avro/eu/driver/model/geojson/FeatureCollection';
import { FeatureType } from '../models/avro/eu/driver/model/geojson/FeatureTypeEnum';
import { PointType } from '../models/avro/eu/driver/model/geojson/PointTypeEnum';
import { PolygonType } from '../models/avro/eu/driver/model/geojson/PolygonTypeEnum';

export const testItemData: ItemInterface = {
    guid: "TEST1",
    name: "TEST2",
    owner: "",
    location: {
      altitude: 0.0,
      longitude: 0.0,
      latitude: 0.0
    },
    orientation: {
      pitch: 0,
      roll: 0,
      yaw: 0
    },
    velocity: {
      magnitude: 0,
      pitch: 0,
      yaw: 0
    },
    visibleForParticipant: false,
    movable: false,
    itemType: null
  
  };

  export const testItemData1: ItemInterface = {
    guid: "TEST1",
    name: "TEST2",
    owner: "",
    location: {
      altitude: 0.0,
      longitude: 4.254193,
      latitude: 52.104876,

      //longitude: 4.255850315093994,
      //latitude: 52.10256443347386
    },
    orientation: {
      pitch: 0,
      roll: 0,
      yaw: 0
    },
    velocity: {
      magnitude: 0,
      pitch: 0,
      yaw: 0
    },
    visibleForParticipant: false,
    movable: false,
    itemType: null

  };

  export const  geoFencerDef: GeoJSONEnvelopeInterface = {
    properties: {
      "Title": "Geo Fencer demo",
      "ID": "GeoFencer1"
    },
    geojson: {

      type: FeatureCollectionType.FeatureCollection,
      features: [
        {
          type: FeatureType.Feature,
          geometry: <Polygon>{
            type: PolygonType.Polygon,
            coordinates: [
              [
                [
                  4.252974987030029,
                  52.10390881121271
                ],
                [
                  4.25321102142334,
                  52.102880761293555
                ],
                [
                  4.253940582275391,
                  52.101483629828074
                ],
                [
                  4.256086349487305,
                  52.1001523600717
                ],
                [
                  4.258725643157959,
                  52.10174724288841
                ],
                [
                  4.257717132568359,
                  52.10344750969288
                ],
                [
                  4.255785942077637,
                  52.10396153108259
                ],
                [
                  4.252974987030029,
                  52.10390881121271
                ]
              ]
            ]
          },
          properties: {
            "ID": "ScheveningenHaven",
            "GeoFencerRule": "GUID = 'TEST1' AND (NAME = 'TEST2' OR GUID = 'TEST2')",
            "Radius": 5
          }
        },
        {
          type: FeatureType.Feature,
          geometry: <Polygon>{
            type: PolygonType.Polygon,
            coordinates: [
              [
                [
                  4.252974987030029,
                  52.10390881121271
                ],
                [
                  4.25321102142334,
                  52.102880761293555
                ],
                [
                  4.253940582275391,
                  52.101483629828074
                ],
                [
                  4.256086349487305,
                  52.1001523600717
                ],
                [
                  4.258725643157959,
                  52.10174724288841
                ],
                [
                  4.257717132568359,
                  52.10344750969288
                ],
                [
                  4.255785942077637,
                  52.10396153108259
                ],
                [
                  4.252974987030029,
                  52.10390881121271
                ]
              ]
            ]
          },
          properties: {
            "ID": "TNO",
            "GeoFencerRule": "GUID = 'TEST1' AND (NAME = 'TEST2' OR GUID LIKE  'TEST2')",
            "Radius": 5
          }
        }
      ]
    }
  }