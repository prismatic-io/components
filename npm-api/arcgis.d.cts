//#region src/types/index.d.ts
type ExportFormat = "Shapefile" | "CSV" | "File Geodatabase" | "Feature Collection" | "GeoJson" | "Scene Package" | "KML" | "Excel";
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "arcgis";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/arcgis/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    addFeatures: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      featureServiceLayerId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      featuresToAdd: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        clean: (json: unknown) => import("@esri/arcgis-rest-request").IFeature[];
        comments: string;
      };
      featureServiceUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getSelf: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@esri/arcgis-rest-portal").IPortal;
    }>;
    listFeatureServices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      ownerName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      start: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (input: unknown) => number | undefined;
      };
      number: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (input: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getFeatureServiceUrl: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      featureServiceName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string | undefined;
    }>;
    getAllLayersAndTables: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      featureServiceUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getLayerId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      featureServiceUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      featureLayerName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: number | undefined;
        name: string | undefined;
      }[];
    }>;
    createWebMap: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webMapName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      authoringApp: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      authoringAppVersion: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      baseMap: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        clean: (json: unknown) => any;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      spatialReference: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      background: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        clean: (json: unknown) => any;
        comments: string;
      };
      bookmarks: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        clean: (json: unknown) => any;
        comments: string;
      };
      geotriggersInfo: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        clean: (json: unknown) => any;
        comments: string;
      };
      initialState: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      mapFloorInfo: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      mapRangeInfo: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      operationalLayers: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      parcelFabric: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      presentation: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      referenceScale: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (input: unknown) => number | undefined;
      };
      tables: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      timeZone: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      utilityNetworks: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      widgets: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (json: unknown) => any;
      };
      editingLocationTrackingEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      editingLocationTrackingInfo: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        default: string;
        clean: (json: unknown) => any;
      };
      searchDisablePlaceFinder: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      searchEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      searchHintText: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      searchLayers: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (json: unknown) => any;
      };
      searchTables: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (json: unknown) => any;
      };
      viewingBasemapGalleryEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      viewingMeasureEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      viewingRoutingEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        id: string;
        folder: string;
      };
    }>;
    searchItems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      searchString: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      start: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (input: unknown) => number | undefined;
      };
      number: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (input: unknown) => number | undefined;
      };
      stringifyResult: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createFeatureService: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      featureServiceName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      featureServiceCapabilities: {
        label: string;
        type: "string";
        required: true;
        example: string;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      serviceDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@esri/arcgis-rest-feature-service").ICreateServiceResult;
    }>;
    addHostedLayerToFeatureService: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      featureServiceUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      geometryType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      allowGeometryUpdates: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      capabilities: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      defaultVisibility: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      drawingInfo: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      extent: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
      fields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (json: unknown) => any;
      };
      hasAttachments: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      hasM: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      hasStaticData: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      hasZ: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      htmlPopupType: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      isDataVersioned: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxRecordCount: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (input: unknown) => number | undefined;
      };
      maxScale: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (input: unknown) => number | undefined;
      };
      minScale: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (input: unknown) => number | undefined;
      };
      objectIdField: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      supportedQueryFormats: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      supportsAdvancedQueries: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      supportsRollbackOnFailureParameter: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      templates: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (json: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@esri/arcgis-rest-feature-service").IAddToServiceDefinitionResult;
    }>;
    geocode: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      addressSearch: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@esri/arcgis-rest-geocoding").IGeocodeResponse;
    }>;
    exportLayers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      featureServiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ownerName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      format: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        default: string;
        clean: (formatString: unknown) => ExportFormat;
      };
      layersToExport: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (json: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        type: string;
        size: number;
        jobId: string;
        serviceItemId: string;
        exportFormat: string;
        exportItemId: string;
      };
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "arcgisOAuth2Connection";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        shown: true;
        comments: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      headers: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        shown: false;
        default: never[];
        comments: string;
      };
    };
  }, "arcgisOAuth2Connection">[];
  dataSources: {
    selectFeatureService: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFeatureServiceUrl: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;