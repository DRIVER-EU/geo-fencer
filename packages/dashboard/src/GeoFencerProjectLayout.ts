
import { LayoutManager } from "@csnext/cs-client";
import { ILayoutManagerConfig, IProject } from "@csnext/cs-core";
import { CsMap, GeojsonLayer, MapLayers, MapOptions } from "@csnext/cs-map";
import { SplitPanel } from "@csnext/cs-split-panel";
import { MapboxOptions } from "mapbox-gl";
import "./assets/example.css";
import "./assets/sgbo.css";
import { GeoFencerViewer } from "./components/geofencer-viewer/geofencer-viewer";
import { CS_REST_URL } from "./Config";
import { MainProject } from "./datasources/MainProject";
import { biHuntLayerSources } from "./definitions/layer-sources";

// tslint:disable-next-line:no-object-literal-type-assertion
LayoutManager.add({
  id: "split-panel",
  // tslint:disable-next-line:trailing-comma
  // tslint:disable-next-line:object-literal-sort-keys
  component: SplitPanel,
} as ILayoutManagerConfig);

export const GeoFencerProject: IProject = {
  useSocket: true,
  // tslint:disable-next-line:object-literal-sort-keys
  socketServerUrl: CS_REST_URL,
  header: {
    breadcrumbs: false,
    dense: false,
    logo: "images/geofencer.png",
    title: "",
  },
  navigation: {
    search: {
      enabled: false,
    },
    style: "tabs",

  },
  datasources: {
    layers: biHuntLayerSources,
    mainmap_datasource: new MapLayers(
      [
        // tslint:disable-next-line:no-object-literal-type-assertion
        {
          color: "green",
          description: "Luchtfoto",
          source: "luchtfoto",
          tags: ["basis kaarten"],
          type: "raster",
        } as GeojsonLayer,
      ],
      "layers",
      [
      ],
    ),
    project_datasouce: new MainProject(),
  },
  theme: {
    colors: {
      accent: "#82B1FF",
      error: "#FF5252",
      info:  "#2196F3" ,
      menu: "#EBF0F5",
      primary: "#EBF0F5",
      secondary: "#e5e9ea",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    dark: false,
  },
  rightSidebar: {
    clipped: true,
    dashboard: {
      widgets: [],
    },
    floating: true,
    open: false,
    width: 25,
  },
  menus: [
  ],
  dashboards: [
    {
      title: "Geo fencer",
      // tslint:disable-next-line:object-literal-sort-keys
      icon: "assignment",
      path: "/",
      layout: "split-panel",
      datasource: "project_datasouce",
      menus: [
      ],
      leftSidebar: {
        clipped: true,
        dashboard: {
          widgets: [
          ],
        },
        open: false,
        width: 0,
      },
      defaultWidgetOptions: {
        widgetBorder: "widget-border-shadow",
      },
      options: {
        defaultPreset: "default_layout",
        presets: {
          default_layout: {
            direction: "vertical",
            elements: [
              {
                size: 100,
                splitpanel: {
                  direction: "horizontal",
                  elements: [
                    {
                      size: 100,
                      splitpanel: {
                        direction: "vertical",
                        disableVerticalScroll: true,
                        elements: [
                          {
                            size: 100,
                            widgetId: "geofencer-viewer_widget",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            icon: "map",
          },
        } as any,
      } as any,
      widgets: [
        {
          component: GeoFencerViewer,
          datasource: "project_datasouce",
          id: "geofencer-viewer_widget",
        },
        {
          component: CsMap,
          datasource: "mainmap_datasource",
          id: "map_widget",
          // tslint:disable-next-line:no-object-literal-type-assertion
          options: {
            class: "data-map-container",
            // tslint:disable-next-line:no-object-literal-type-assertion
            mbOptions: {
              center: [4.294637, 52.056277],
              style: "mapbox://styles/mapbox/streets-v9", // "http://localhost:901/styles/klokantech-basic/style.json",
              zoom: 9,
            } as MapboxOptions,
            showDraw: true,
            showGeocoder: true,
            showLegend: true,
            showRuler: true,
            showStyles: false,
            token:
            "pk.eyJ1IjoiZGFteWxlbiIsImEiOiJfdUUzLVhNIn0.7-Ogdnc6voJfUXOMBE1VPA",

          } as MapOptions,
        },
      ],
    },
  ],
};
