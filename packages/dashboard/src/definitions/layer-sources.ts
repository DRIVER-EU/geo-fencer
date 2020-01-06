import { LayerSource, LayerSources } from "@csnext/cs-map";

export const biHuntLayerSources = new LayerSources({
    // tslint:disable-next-line:no-object-literal-type-assertion
    luchtfoto: {
      title: "Lucht foto's actueel ",
      type: "raster",
      url:
        // tslint:disable-next-line:max-line-length
        "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wms?SERVICE=WMS&VERSION=1.3.0&bbox={bbox-epsg-3857}&REQUEST=GetMap&format=image/png&width=265&height=256&LAYERS=Actueel_ortho25&CRS=EPSG%3A3857&transparent=true&styles=default",
      // tslint:disable-next-line:object-literal-sort-keys
      tileSize: 256,
    } as LayerSource,
  });
