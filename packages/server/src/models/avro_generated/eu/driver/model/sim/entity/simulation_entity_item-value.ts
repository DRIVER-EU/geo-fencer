/** WGS84-based standard representation of a location on earth */
export interface ILocation {
  /** Latitude in degrees (-90, 90] - 0 is equator */
  latitude: number;
  /**
   * Longitude in degrees (-180, 180] - 0 is line [geographic north - Greenwich -
   * geographic south]
   */
  longitude: number;
  /** Altitude in meters - 0 is surface of WGS84-based ellipsoid */
  altitude?: null | undefined | number;
}

/**
 * WGS84/Aviation-based representation of an orientation on earth - Right-handed
 * item-specific reference system, with in base-setting heading/yaw-axis pointing
 * down (to the centre of the earth), pitch-axis pointing to the right,
 * roll/bank-axis pointing forward
 */
export interface IOrientation {
  /**
   * Yaw or heading in degrees [0, 360) - 0 is pointing towards geographic north -
   * yaw of 90 is EAST, yaw of 270 is WEST
   */
  yaw: number;
  /**
   * Pitch in degrees (-90, 90] - 0 is perpendicular to line [origin of item -
   * centre of WGS84-based ellipsoid] - pitch of +45 is 45 degrees pointing
   * upwards, -45 is 45 degrees pointing downwards
   */
  pitch: number;
  /**
   * Roll or bank in degrees (-180, 180] - 0 is perpendicular to line [origin of
   * item - centre of WGS84-based ellipsoid] - bank of +45 is 45 degrees roll to
   * the right, -45 is 45 degrees roll to the left
   */
  roll: number;
}

/**
 * WGS84/Aviation-based representation of a velocity vector. Right-handed
 * item-specific reference system, with in base-setting heading/yaw-axis pointing
 * down (to the centre of the earth), pitch-axis pointing to the right,
 * roll/bank-axis pointing forward
 */
export interface IVelocity {
  /**
   * Yaw or heading in degrees [0, 360) - 0 is pointing towards geographic north -
   * yaw of 90 is EAST, yaw of 270 is WEST
   */
  yaw: number;
  /**
   * Pitch in degrees (-90, 90] - 0 is perpendicular to line [origin of item -
   * centre of WGS84-based ellipsoid] - pitch of +45 is 45 degrees pointing
   * upwards, -45 is 45 degrees pointing downwards
   */
  pitch: number;
  /**
   * Velocity in meter per second [0, inf) - 0 is standing still relative to the
   * earth
   */
  magnitude: number;
}

export enum ObjectSubType {
  PROP = 'PROP',
  TOOL = 'TOOL'
}

/** Information if the item is an object */
export interface IObjectType {
  /** Sub type of objects that this item is */
  subType: ObjectSubType;
}

export enum PersonSubType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
}

/** Information if the item is a person */
export interface IPersonType {
  /** Gender of the person */
  gender: PersonSubType;
}

export enum VehicleSubType {
  CAR = 'CAR',
  VAN = 'VAN',
  TRUCK = 'TRUCK',
  BOAT = 'BOAT',
  PLANE = 'PLANE',
  HELICOPTER = 'HELICOPTER',
  MOTORCYCLE = 'MOTORCYCLE'
}

/** Information if the item is a vehicle */
export interface IVehicleType {
  /** Sub type of vehicles that this item is */
  subType: VehicleSubType;
}

export enum EnvironmentSubLabel {
  FOLIAGE = 'FOLIAGE',
  ROAD = 'ROAD'
}

/** Information if the item is labeled as environment */
export interface IEnvironmentLabel {
  /** Sub label of environment that this item has */
  subLabel: EnvironmentSubLabel;
}

export enum IncidentSubLabel {
  FIRE = 'FIRE',
  CRASH = 'CRASH'
}

/** Information if the item is labeled as incident */
export interface IIncidentLabel {
  /** Sub label of incident that this item has */
  subLabel: IncidentSubLabel;
}

export enum RescueSubLabel {
  POLICE = 'POLICE',
  MEDICAL = 'MEDICAL',
  FIRE = 'FIRE',
  SECURITY = 'SECURITY',
  MILITARY = 'MILITARY'
}

/** Information if the item is labeled as rescue */
export interface IRescueLabel {
  /** Sub label of rescue that this item has */
  subLabel: RescueSubLabel;
}

/**
 * Common Simulation Space Item, representing a visual entity inside the
 * simulation world. *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The
 * Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of
 * DRIVER+ WP923 Test-bed infrastructure project. This file is licensed under the
 * MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*
 */
export interface IItem {
  /** Globally unique identifier for this entity */
  guid: string;
  /** Name of this entity */
  name: string;
  /** Identifier of the simulator currently responsible for this entity */
  owner: string;
  /** Location of this item */
  location: ILocation;
  /** Orientation of this item */
  orientation: IOrientation;
  /** Movement vector of the item, including the magnitude */
  velocity: IVelocity;
  /** Indication whether or not this item is visible for all participants */
  visibleForParticipant: boolean;
  /** Indication whether or not this item is movable in the simulation world */
  movable: boolean;
  /**
   * Concrete type of this item - can be of type ObjectType, PersonType or
   * VehicleType
   */
  itemType?: null | undefined | IObjectType | IPersonType | IVehicleType;
  /**
   * Scenario type of this item - can be of type EnvironmentLabel, IncidentLabel or
   * RescueLabel
   */
  scenarioLabel?: null | undefined | IEnvironmentLabel | IIncidentLabel | IRescueLabel;
  /** List of all tags the user provided associated with this item */
  userTags?: null | undefined | string[];
  /**
   * List of physical connection entities references (represented by their GUIDs)
   * this item has
   */
  physicalConnections?: null | undefined | string[];
  /**
   * Reference to the group connection entity (represented by its GUID) this item is
   * part of
   */
  group?: null | undefined | string;
  /**
   * Reference to the formation connection entity (represented by its GUID) this
   * item is part of
   */
  formation?: null | undefined | string;
  /**
   * Reference to the unit connection entity (represented by its GUID) this item is
   * part of
   */
  unit?: null | undefined | string;
  /** Metadata for the FeatureCollection in the geojson field. */
  properties?: null | undefined | { [key: string]: null | undefined | boolean | string | number };
}
