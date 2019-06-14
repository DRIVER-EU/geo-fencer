
import { IItem, IObjectType, IPersonType, IVehicleType, ObjectSubType, VehicleSubType } from './../../../../../avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';

export enum ForceIdentifier {
    Other = 'Other',
    Friendly = 'Friendly',
    Opposing = 'Opposing',
    Neutral = 'Neutral',
    Invalid = 'Invalid'
}

export enum ObjectType {
    Person = 'Person',
    Object = 'Object',
    Vehicle = 'Vehicle',
    Unknown = 'Unknown',
    Invalid = 'Invalid'
}

// This sucks; no easy way to check if type is IObjectType | IPersonType | IVehicleType
// Object and Vehicle have only subType as property :!@@

function isObject(simType:  IObjectType | IPersonType | IVehicleType): simType is IObjectType {
    return (('subType' in simType) && (ObjectSubType[(<IObjectType>simType).subType] != null));
 }

 function isPerson(simType:  IObjectType | IPersonType | IVehicleType): simType is IPersonType {
    return (<IPersonType>simType).gender !== undefined;
 }

 function isVehicle(simType:  IObjectType | IPersonType | IVehicleType): simType is IVehicleType {
    return (('subType' in simType) && (VehicleSubType[(<IVehicleType>simType).subType] != null));
 }

export function getSimulationType(simItem: IItem): ObjectType {
    if ((simItem) && (simItem.itemType)) {
        if (isVehicle(simItem.itemType)) return ObjectType.Vehicle;
        else if (isObject(simItem.itemType)) return ObjectType.Object;
        else if (isPerson(simItem.itemType)) return ObjectType.Person;
        else return ObjectType.Invalid;
    } else return ObjectType.Unknown;
}

export function getForceIdentifier(simItem: IItem): ForceIdentifier {
    getSimulationType(simItem);
    if (simItem.hasOwnProperty('properties')) {
        if ((simItem.properties)) {
            let propValue = simItem.properties['ForceIdentifier'] as string;
            return stringToForceIdentifier(propValue);
        }
    }
    return ForceIdentifier.Other;
}

export function stringToForceIdentifier(value: string): ForceIdentifier {
    if (value) {
       switch (value.toUpperCase()) {
           case 'OTHER': return ForceIdentifier.Other;
           case 'FRIENDLY': return ForceIdentifier.Friendly;
           case 'OPPOSING': return ForceIdentifier.Opposing;
           case 'NEUTRAL': return ForceIdentifier.Neutral;
           default:
               return ForceIdentifier.Invalid;
       }
    }
    return ForceIdentifier.Invalid;
}


