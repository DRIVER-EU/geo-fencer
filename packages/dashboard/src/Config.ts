// TODO Use config
export const LAYER_URL =
  process.env.NODE_ENV !== "production"
    ? "http://geofencer-layer-api.ras.nl/"
    : "http://cool5.sensorlab.tno.nl:4022/";

export const GEOFENCER_BASE_PATH =  process.env.VUE_APP_REST_API_URL
   ? process.env.VUE_APP_REST_API_URL.replace(/\/+$/, "")
   : "http://geofencer-api.ras.nl".replace(/\/+$/, "");

// Common sense framework URL
export const CS_REST_URL = process.env.VUE_APP_CS_API_URL
   ? process.env.VUE_APP_CS_API_URL.replace(/\/+$/, "")
   : "http://geofencer-cs-api.ras.nl".replace(/\/+$/, "");
