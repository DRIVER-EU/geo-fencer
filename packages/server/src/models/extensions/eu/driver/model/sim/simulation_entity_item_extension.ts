
import { IItem } from './../../../../../avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';

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

function isObject(simType: string): boolean {
    return simType === 'object';
 }

 function isPerson(simType: string): boolean {
    return simType === 'object';
 }

 function isVehicle(simType:  string): boolean {
    return simType === 'vehicle';
 }

export function getSimulationType(simItem: IItem): ObjectType {
    if ((simItem) && (simItem.type)) {
        if (isVehicle(simItem.type)) return ObjectType.Vehicle;
        else if (isObject(simItem.type)) return ObjectType.Object;
        else if (isPerson(simItem.type)) return ObjectType.Person;
        else return ObjectType.Invalid;
    } else return ObjectType.Unknown;
}

export function getForceIdentifier(simItem: IItem): ForceIdentifier {
    if (simItem.hasOwnProperty('tags')) {
        if ((simItem.tags) && (simItem.tags.hasOwnProperty('ForceIdentifier'))) {
            let propValue = simItem.tags['ForceIdentifier'] as string;
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


