/**
 * Special message to indicate a particular entity/connection has been deleted.
 * *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn
 * Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed
 * infrastructure project. This file is licensed under the MIT license :
 * https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*
 */
export interface IObjectDeleted {
  /** globally unique identifier for the entity/connection that is deleted */
  guid: string;
  /**
   * identifier of the simulator currently responsible for this entity/connection
   */
  owner: string;
}
