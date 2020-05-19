/**
 * A support message to notify a deletion of an entity. *Copyright (C) 2019-2020
 * XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @
 * xvrsim.com>. This file is licensed under the MIT license :
 * https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*
 */
export interface IEntityDeleted {
  /** Unique identifier of the entity */
  id: string;
  /**
   * Optional unique identifier of the connected application owning the entity
   */
  owner?: null | undefined | string;
  /**
   * Optional UNIX Epoch time in milliseconds marking the time the update was
   * performed
   */
  timestamp?: null | undefined | number;
}
