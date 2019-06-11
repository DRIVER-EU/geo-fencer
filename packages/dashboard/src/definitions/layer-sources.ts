import { LayerSource, LayerSources } from "@csnext/cs-map";

export const biHuntLayerSources = new LayerSources({
    buienradar: {
      title: "Buienradar",
      type: "raster",
      url:
        "http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?SERVICE=WMS&VERSION=1.3.0&bbox={bbox-epsg-3857}&REQUEST=GetMap&format=image/png&width=265&height=256&LAYERS=RADNL_OPER_R___25PCPRR_L3_COLOR&CRS=EPSG%3A3857&transparent=true",
// tslint:disable-next-line: object-literal-sort-keys
      tileSize: 256,
    } as LayerSource,
    luchtfoto: {
      title: "Lucht foto's actueel ",
      type: "raster",
      url:
        "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wms?SERVICE=WMS&VERSION=1.3.0&bbox={bbox-epsg-3857}&REQUEST=GetMap&format=image/png&width=265&height=256&LAYERS=Actueel_ortho25&CRS=EPSG%3A3857&transparent=true&styles=default",
      tileSize: 256,
    } as LayerSource,
    hoogtekaart: {
      title: "Hoogte Kaart (AHN3)",
      type: "raster",
      url:
        "https://geodata.nationaalgeoregister.nl/ahn3/wms?SERVICE=WMS&VERSION=1.3.0&bbox={bbox-epsg-3857}&REQUEST=GetMap&format=image/png&width=265&height=256&LAYERS=ahn3_5m_dsm&CRS=EPSG%3A3857&transparent=true&styles=default",
      tileSize: 256,
    } as LayerSource,

    // https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts?layer=Actueel_ortho25&style=default&tilematrixset=EPSG%3A28992&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=13&TileCol=3724&TileRow=3782
    gemeenten: {
      title: "Gemeenten",
      url: "/layers/townships.json",
    } as LayerSource,
    wijken: {
      title: "Wijken",
      url: "/layers/wijk_2017.json",
    } as LayerSource,
    buurten: {
      title: "Buurten",
      url: "/layers/buurt_2017.json",
    } as LayerSource,
    provincie: {
      title: "Provincie",
      url: "/layers/provincie_2017.json",
    } as LayerSource,
    evenement: {
      title: "Evenement",
      url: "/layers/evenement.json",
    } as LayerSource,
  });