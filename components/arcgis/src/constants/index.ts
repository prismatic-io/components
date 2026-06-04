export const FEATURES_JSON_EXAMPLE = JSON.stringify(
  [
    {
      geometry: {
        x: -118.15,
        y: 33.8,
      },
      attributes: {
        OWNER: "Joe Smith",
        VALUE: 94820.37,
        APPROVED: true,
        LASTUPDATE: 1227663551096,
      },
    },
    {
      geometry: {
        x: -118.37,
        y: 34.086,
      },
      attributes: {
        OWNER: "John Doe",
        VALUE: 17325.9,
        APPROVED: false,
        LASTUPDATE: 1227628579430,
      },
    },
  ],
  null,
  2,
);

export const SEARCH_LAYERS_JSON_EXAMPLE = JSON.stringify(
  [
    {
      id: "Census_9227",
      field: {
        name: "STATE_NAME",
        exactMatch: false,
        type: "esriFieldTypeString",
      },
      subLayer: 3,
    },
  ],
  null,
  2,
);

export const LOCATION_TRACKING_INFO_JSON_EXAMPLE = JSON.stringify(
  {
    layerId: "e1eb5f1b-605d-41de-8254-b1f8b50f22af",
    updateInterval: "300",
  },
  null,
  2,
);

export const SEARCH_TABLES_JSON_EXAMPLE = JSON.stringify(
  [
    {
      id: "table1",
      field: {
        name: "field1",
        exactMatch: false,
        type: "esriFieldTypeString",
      },
    },
  ],
  null,
  2,
);

export const BACKGROUND_JSON_EXAMPLE = JSON.stringify({
  color: [255, 255, 255, 255],
});

export const BASEMAP_JSON_EXAMPLE = JSON.stringify(
  {
    baseMapLayers: [
      {
        title: "OSM",
        type: "OpenStreetMap",
        layerType: "OpenStreetMap",
        opacity: 1,
        visibility: true,
        id: "OpenStreetMap",
        blendMode: "hue",
      },
    ],
    title: "Imagery with Labels",
  },
  null,
  2,
);

export const BOOKMARKS_JSON_EXAMPLE = JSON.stringify(
  [
    {
      name: "Turning Torso",
      thumbnail: {
        url: "https://live.staticflickr.com/46/162587578_7e5b01da61.jpg",
      },
      viewpoint: {
        rotation: 20.10910658523367,
        scale: 144447.638572,
        targetGeometry: {
          spatialReference: {
            latestWkid: 3857,
            wkid: 102100,
          },
          xmin: 1433565,
          ymin: 7465055,
          xmax: 1465745,
          ymax: 7485349,
        },
      },
      extent: {
        spatialReference: {
          latestWkid: 3857,
          wkid: 102100,
        },
        xmin: 1433565,
        ymin: 7465055,
        xmax: 1465745,
        ymax: 7485349,
      },
      timeExtent: [1125100800, null],
    },
  ],
  null,
  2,
);

export const GEOTRIGGERS_INFO_JSON_EXAMPLE = JSON.stringify(
  {
    geotriggers: [
      {
        type: "fence",
        name: "Example Geotrigger - Notify when I am within 50m of my target areas.",
        feed: {
          type: "deviceLocation",
          filterExpression: {
            title: "Location filter",
            expression: "return $locationupdate.horizontalaccuracy <= 20",
          },
        },
        fenceNotificationRule: "enter",
        feedAccuracyMode: "useGeometryWithAccuracy",
        enterExitRule: "enterIntersectsAndExitDoesNotIntersect",
        fenceParameters: {
          type: "features",
          bufferDistance: 50,
          fenceSource: {
            layerUrl:
              "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/MapServer/0",
            type: "featureLayer",
          },
          filter: {
            where: "facility = 6",
            geometry: {
              x: 13871520.850500003,
              y: 3910293.086000003,
              spatialReference: {
                wkid: 102100,
                latestWkid: 3857,
              },
            },
          },
        },
        notificationOptions: {
          expressionInfo: {
            title: "Expression",
            expression: "'You have entered' + $fencefeature.AREA_NAME",
          },
        },
      },
      {
        type: "fence",
        name: "Geotrigger 2",
        feed: {
          type: "deviceLocation",
        },
        fenceNotificationRule: "exit",
        fenceParameters: {
          type: "features",
          bufferDistance: 1000,
          fenceSource: {
            layerId: "1234",
            type: "featureLayer",
          },
        },
      },
    ],
  },
  null,
  2,
);

export const INITIAL_STATE_JSON_EXAMPLE = JSON.stringify(
  {
    viewpoint: {
      rotation: 45,
      scale: 36111,
      targetGeometry: {
        spatialReference: {
          latestWkid: 3857,
          wkid: 102100,
        },
        xmin: -8237304.65218491,
        ymin: 4977090.890664136,
        xmax: -8230616.412209966,
        ymax: 4983588.038068367,
      },
    },
  },
  null,
  2,
);

export const MAP_FLOOR_INFO_JSON_EXAMPLE = JSON.stringify(
  {
    facilityLayer: {
      facilityIdField: "FACILITY_ID",
      layerId: "Facility_2419",
      nameField: "NAME",
      siteIdField: "SITE_ID",
    },
    levelLayer: {
      facilityIdField: "FACILITY_ID",
      layerId: "Levels_3860",
      levelIdField: "LEVEL_ID",
      levelNumberField: "LEVEL_NUMBER",
      longNameField: "NAME",
      shortNameField: "NAME_SHORT",
      verticalOrderField: "VERTICAL_ORDER",
    },
  },
  null,
  2,
);

export const MAP_RANGE_INFO_JSON_EXAMPLE = JSON.stringify(
  {
    activeRangeName: "floors",
    currentRangeExtent: [-2, 10],
    fullRangeExtent: [-2, 100],
  },
  null,
  2,
);

export const OPERATIONAL_LAYERS_JSON_EXAMPLE = JSON.stringify(
  [
    {
      id: "Recreation_4720",
      layerType: "ArcGISFeatureLayer",
      url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/MapServer/0",
      visibility: true,
      opacity: 1,
      mode: 1,
      title: "Map Service Layer",
      blendMode: "color-burn",
      popupInfo: {
        title: "Facilities: {description}",
        fieldInfos: [],
        description: null,
        showAttachments: true,
        mediaInfos: [],
      },
    },
  ],
  null,
  2,
);

export const PARCEL_FABRIC_JSON_EXAMPLE = JSON.stringify(
  {
    id: "123",
    title: "L0Ren6kV5",
    url: "https://sampleserver.esri.com/server/rest/services/RentonV56K/FeatureServer/0",
  },
  null,
  2,
);

export const PRESENTATION_JSON_EXAMPLE = JSON.stringify(
  {
    displayTimeSlider: false,
    showLegend: true,
    slideAdvancementInterval: 0,
    slides: [
      {
        baseMap: {
          baseMapLayers: [
            {
              id: "Census_6367",
              layerType: "ArcGISMapServiceLayer",
              url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
              visibility: true,
              opacity: 1,
              title: "Census",
              showLegend: true,
            },
          ],
          title: "Topographic",
        },
        mapLocation: {
          centerPoint: {
            spatialReference: {
              wkid: 102100,
            },
            x: -13039519.5049599,
            y: 4038507.24398202,
          },
        },
        title: {
          backgroundColor: [0, 0, 0, 255],
          borderColor: [0, 0, 0, 255],
          borderSize: 0,
          font: "Tahoma",
          fontSize: 32,
          foregroundColor: [255, 255, 255, 255],
          horizontalAlignment: 1,
          opacity: 0.63,
          text: "Meet in Redlands at 7:30 at Uncle Howies",
          titleFontStyle: 1,
        },
        visibleLayers: [
          {
            featureVisibility: [[1], [], [], [0]],
            id: "73128eb3-05ee-46a7-8c22-0c385a0b1827",
          },
        ],
      },
    ],
  },
  null,
  2,
);

export const SPATIAL_REFERENCE_JSON_EXAMPLE = JSON.stringify(
  {
    wkid: 102100,
    latestWkid: 3857,
  },
  null,
  2,
);

export const TABLES_JSON_EXAMPLE = JSON.stringify(
  [
    {
      url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/SF311/FeatureServer/1",
      id: "SF311_1421",
      title: "SF311 - SF_Crime_Incidents",
      itemId: "0217f8067457410a998fc9293563ba94",
      capabilities: "Query",
    },
  ],
  null,
  2,
);

export const UTILITY_NETWORKS_JSON_EXAMPLE = JSON.stringify(
  [
    {
      id: "1",
      title: "Electric Utility Network",
      url: "https://sampleserver7.arcgisonline.com/arcgis/rest/services/UtilityNetwork/NapervilleElectric/FeatureServer/921",
      traceConfigurations: [
        {
          title: "Circuit Trace",
          id: "111ce238-a186-42f1-bcbd-05a1180ff484",
        },
        {
          title: "Upstream Protective device trace",
          id: "f0f3e0da-620a-43c2-b52c-59461e4eac95",
        },
        {
          title: "Downstream customer trace",
          id: "da61a483-6770-4721-868a-b78745a5f183",
        },
      ],
    },
  ],
  null,
  2,
);

export const EXTENT_JSON_EXAMPLE = JSON.stringify(
  {
    xmin: -134.74729261792592,
    ymin: 23.56096242376989,
    xmax: -55.695547615409396,
    ymax: 50.309217030288835,
    spatialReference: { wkid: 4326 },
  },
  null,
  2,
);

export const DRAWING_INFO_JSON_EXAMPLE = JSON.stringify(
  {
    transparency: 0,
    labelingInfo: null,
    renderer: {
      type: "simple",
      symbol: {
        color: [20, 158, 206, 130],
        size: 18,
        angle: 0,
        xoffset: 0,
        yoffset: 0,
        type: "esriSMS",
        style: "esriSMSCircle",
        outline: {
          color: [255, 255, 255, 220],
          width: 2.25,
          type: "esriSLS",
          style: "esriSLSSolid",
        },
      },
    },
  },
  null,
  2,
);

export const FIELDS_JSON_EXAMPLE = JSON.stringify(
  [
    {
      name: "OBJECTID",
      type: "esriFieldTypeOID",
      alias: "OBJECTID",
      sqlType: "sqlTypeOther",
      nullable: false,
      editable: false,
      domain: null,
      defaultValue: null,
    },
    {
      name: "id",
      type: "esriFieldTypeInteger",
      alias: "id",
      sqlType: "sqlTypeInteger",
      nullable: true,
      editable: true,
      domain: null,
      defaultValue: null,
    },
    {
      name: "name",
      type: "esriFieldTypeString",
      alias: "name",
      sqlType: "sqlTypeNVarchar",
      nullable: true,
      editable: true,
      domain: null,
      defaultValue: null,
      length: 256,
    },
    {
      name: "rating",
      type: "esriFieldTypeString",
      alias: "rating",
      sqlType: "sqlTypeNVarchar",
      nullable: true,
      editable: true,
      domain: null,
      defaultValue: null,
      length: 256,
    },
  ],
  null,
  2,
);

export const TEMPLATES_JSON_EXAMPLE = JSON.stringify(
  [
    {
      name: "New Feature",
      description: "",
      drawingTool: "esriFeatureEditToolPoint",
      prototype: {
        attributes: {
          id: null,
          name: null,
          rating: null,
        },
      },
    },
  ],
  null,
  2,
);

export const EXPORT_LAYERS_JSON_EXAMPLE = JSON.stringify(
  [{ id: 0 }, { id: 1, where: "POP1999 > 100000" }],
  null,
  2,
);
