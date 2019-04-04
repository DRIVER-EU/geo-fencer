
import { LayoutManager } from "@csnext/cs-client";
import { ILayoutManagerConfig, IProject } from "@csnext/cs-core";
import { CsMap, GeojsonLayer, MapLayers, MapOptions } from "@csnext/cs-map";
import { SplitPanel } from "@csnext/cs-split-panel";
import { MapboxOptions } from "mapbox-gl";
import "./assets/example.css";
import "./assets/sgbo.css";
import { GeoFencerViewer } from "./components/geofencer-viewer/geofencer-viewer";
import "./Config";
import { MainProject } from "./datasources/MainProject";
import { biHuntLayerSources } from "./definitions/layer-sources";



LayoutManager.add({
  id: "split-panel",
  component: SplitPanel
} as ILayoutManagerConfig);

export const GeoFencerProject: IProject = { 
  useSocket: true,
  socketServerUrl: "http://localhost:3007",
  header: {
    breadcrumbs: false,
    dense: false,
    title: "",
    logo: "images/geofencer.png",
  },
  navigation: {
    search: {
      enabled: false
    },
    style: "tabs",

  },
  datasources: {
    layers: biHuntLayerSources,
    mainmap_datasource: new MapLayers(
      [
        {
          color: "green",
          description: "Luchtfoto",
          source: "luchtfoto",
          tags: ["basis kaarten"],
          type: "raster"
        } as GeojsonLayer
      ],
      "layers",
      [
        
      ]
    ),
    project_datasouce: new MainProject(),
    
  },
  theme: {
    dark: false,
    colors: {
      accent: "#82B1FF",
      error: "#FF5252",
      info:  "#2196F3" ,
      menu: "#EBF0F5",
      primary: "#EBF0F5",
      secondary: "#e5e9ea",
      success: "#4CAF50",
      warning: "#FFC107",
    }
  },
  rightSidebar: {
    clipped: true,
    dashboard: {
      widgets: []
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
      icon: "assignment",
      path: "/",
      layout: "split-panel",
      datasource: "project_datasouce",
      menus: [
      ],
      leftSidebar: {
        open: false,
        clipped: true,
        width: 0,        
        dashboard: {
          widgets: [
          ]
        }
      },
      defaultWidgetOptions: {
        widgetBorder: "widget-border-shadow"
      },
      options: {
        defaultPreset: "default_layout",
        presets: {          
          default_layout: {
            
            icon: "map",
            direction: "vertical",
            elements: [
              {
                size: 100,
                splitpanel: {
                  direction: "horizontal",
                  elements: [
                    { size: 25, widgetId: "map_widget" },
                    {
                      size: 75,
                      splitpanel: {
                        direction: "vertical",
                        disableVerticalScroll: true,
                        elements: [
                          {
                            size: 100,
                            widgetId: "geofencer-viewer_widget"
                          }
                        ]
                      }
                    },
                    
                  ]
                }
              }
            ]
          }
        } as any
      } as any,
      widgets: [
        {
          id: "geofencer-viewer_widget",
          component: GeoFencerViewer,
          datasource: "project_datasouce"        
        },
        {
          id: "map_widget",
          component: CsMap,
          datasource: "mainmap_datasource",
          options: {
            class: "data-map-container",
            token:
              "pk.eyJ1IjoiZGFteWxlbiIsImEiOiJfdUUzLVhNIn0.7-Ogdnc6voJfUXOMBE1VPA",
            mbOptions: {
              style: "mapbox://styles/mapbox/streets-v9", //"http://localhost:901/styles/klokantech-basic/style.json",
              center: [4.294637, 52.056277],
              zoom: 9
            } as MapboxOptions,
            showDraw: true,
            showRuler: true,
            showStyles: false,
            showGeocoder: true,
            showLegend: true
          } as MapOptions
        
        }
      ]
    },

  ]
};
