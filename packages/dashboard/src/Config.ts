// TODO Use config
export const LAYER_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3007/'
    : 'http://cool5.sensorlab.tno.nl:4022/';

export const GEOFENCER_BASE_PATH = "http://localhost:7890".replace(/\/+$/, "");