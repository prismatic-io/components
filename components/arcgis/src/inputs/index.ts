import type { IFeature } from "@esri/arcgis-rest-request";
import { input, util } from "@prismatic-io/spectral";
import {
  BACKGROUND_JSON_EXAMPLE,
  BASEMAP_JSON_EXAMPLE,
  BOOKMARKS_JSON_EXAMPLE,
  DRAWING_INFO_JSON_EXAMPLE,
  EXPORT_LAYERS_JSON_EXAMPLE,
  EXTENT_JSON_EXAMPLE,
  FEATURES_JSON_EXAMPLE,
  FIELDS_JSON_EXAMPLE,
  GEOTRIGGERS_INFO_JSON_EXAMPLE,
  INITIAL_STATE_JSON_EXAMPLE,
  LOCATION_TRACKING_INFO_JSON_EXAMPLE,
  MAP_FLOOR_INFO_JSON_EXAMPLE,
  MAP_RANGE_INFO_JSON_EXAMPLE,
  OPERATIONAL_LAYERS_JSON_EXAMPLE,
  PARCEL_FABRIC_JSON_EXAMPLE,
  PRESENTATION_JSON_EXAMPLE,
  SEARCH_LAYERS_JSON_EXAMPLE,
  SEARCH_TABLES_JSON_EXAMPLE,
  SPATIAL_REFERENCE_JSON_EXAMPLE,
  TABLES_JSON_EXAMPLE,
  TEMPLATES_JSON_EXAMPLE,
  UTILITY_NETWORKS_JSON_EXAMPLE,
} from "../constants";
import type { ExportFormat } from "../types";
import {
  checkAndParseJson,
  parseFloatInput,
  parseIntInput,
  parseStringInput,
} from "../utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const featureServiceLayerId = input({
  label: "Feature Service Layer ID",
  type: "string",
  required: true,
  example: "0",
  comments:
    "This is the ID of the layer in the hosted feature service. You can find this ID using the 'Get Layer ID' action.",
  clean: util.types.toString,
});

export const featureServiceUrl = input({
  label: "Feature Service URL",
  type: "string",
  required: true,
  example:
    "https://services3.arcgis.com/GVgbJbqm1aABCDEa/ArcGIS/rest/services/my_points/FeatureServer",
  comments:
    "This is the URL of the hosted feature service, not a specific layer. You can find this URL using the 'Get Feature Service URL' action.",
  clean: util.types.toString,
  dataSource: "selectFeatureServiceUrl",
});

export const featuresToAdd = input({
  label: "Features to Add",
  type: "code",
  language: "json",
  required: true,
  default: FEATURES_JSON_EXAMPLE,
  clean: (json: unknown) => {
    const featuresJson = checkAndParseJson(json) as IFeature[];
    return featuresJson;
  },
  comments:
    "Add Attributes and Geometry Points, Multipoints, Polylines, Polygons and Envelopes. You can check more information about the feature JSON object here: https://developers.arcgis.com/rest/services-reference/enterprise/feature-object.htm https://developers.arcgis.com/rest/services-reference/enterprise/add-features.htm",
});

export const featureServiceCapabilities = input({
  label: "Feature Service Capabilities",
  type: "string",
  required: true,
  example: "Create,Delete,Query,Update,Editing",
  default: "Create,Delete,Query,Update,Editing",
  comments: "A comma-separated list of supported operations.",
  clean: util.types.toString,
});

export const featureServiceName = input({
  label: "Feature Service Name",
  type: "string",
  required: true,
  example: "Acme_Layers",
  comments: "A hosted feature service name.",
  clean: util.types.toString,
});

export const featureLayerName = input({
  label: "Feature Layer Name",
  type: "string",
  required: true,
  comments: "A feature layer name.",
  example: "Acme_Layer",
  clean: util.types.toString,
});

export const webMapName = input({
  label: "Web Map Name",
  type: "string",
  required: true,
  comments: "A web map name.",
  example: "Acme_Web_Map",
  clean: util.types.toString,
});

export const ownerName = input({
  label: "Owner Name",
  type: "string",
  required: false,
  comments: "If not provided, the current user username will be used.",
  example: "Acme",
  clean: util.types.toString,
});

export const searchString = input({
  label: "Search String",
  type: "string",
  required: true,
  comments: "A search string.",
  example: "Water",
  clean: util.types.toString,
});

export const background = input({
  label: "Background",
  type: "code",
  language: "json",
  required: false,
  default: BACKGROUND_JSON_EXAMPLE,
  clean: checkAndParseJson,
  comments:
    "Defines the appearance for the background of the map, leave blank to use default values. You can check more information about the background JSON object here: https://developers.arcgis.com/web-map-specification/objects/background/",
});

export const authoringApp = input({
  label: "Authoring App",
  type: "string",
  required: true,
  comments:
    "String value indicating the application that last authored the webmap.",
  example: "Acme",
  clean: util.types.toString,
});

export const authoringAppVersion = input({
  label: "Authoring App Version",
  type: "string",
  required: true,
  comments:
    "String value indicating the application that last authored the webmap.",
  example: "1.0",
  clean: util.types.toString,
});

export const baseMap = input({
  label: "Base Map",
  type: "code",
  language: "json",
  required: true,
  default: BASEMAP_JSON_EXAMPLE,
  clean: checkAndParseJson,
  comments:
    "Basemaps give the web map a geographic context. You can check more information about the basemap JSON object here: https://developers.arcgis.com/web-map-specification/objects/baseMap/",
});

export const bookmarks = input({
  label: "Bookmarks",
  type: "code",
  language: "json",
  required: false,
  default: BOOKMARKS_JSON_EXAMPLE,
  clean: checkAndParseJson,
  comments:
    "A bookmark is a saved geographic extent that allows end users to quickly navigate to a particular area of interest, leave blank to use default values. You can check more information about the bookmarks JSON object here: https://developers.arcgis.com/web-map-specification/objects/bookmark/",
});

export const geotriggersInfo = input({
  label: "Geotriggers Info",
  type: "code",
  language: "json",
  required: false,
  default: GEOTRIGGERS_INFO_JSON_EXAMPLE,
  clean: checkAndParseJson,
  comments:
    "Information on any Geotrigger conditions defined for this map, leave blank to use default values. You can check more information about the geotriggers info JSON object here: https://developers.arcgis.com/web-map-specification/objects/geotriggersInfo/",
});

export const initialState = input({
  label: "Initial State",
  type: "code",
  language: "json",
  required: false,
  default: INITIAL_STATE_JSON_EXAMPLE,
  comments:
    "The initial state at which to open the map, leave blank to use default values. You can check more information about the initial state JSON object here: https://developers.arcgis.com/web-map-specification/objects/initialState/",
  clean: checkAndParseJson,
});

export const mapFloorInfo = input({
  label: "Map Floor Info",
  type: "code",
  language: "json",
  required: false,
  default: MAP_FLOOR_INFO_JSON_EXAMPLE,
  comments:
    "Contains floor-awareness information for the map, leave blank to use default values. You can check more information about the map floor info JSON object here: https://developers.arcgis.com/web-map-specification/objects/mapFloorInfo/",
  clean: checkAndParseJson,
});

export const mapRangeInfo = input({
  label: "Map Range Info",
  type: "code",
  language: "json",
  required: false,
  default: MAP_RANGE_INFO_JSON_EXAMPLE,
  comments:
    "Map range information, leave blank to use default values. You can check more information about the map range info JSON object here: https://developers.arcgis.com/web-map-specification/objects/mapRangeInfo/",
  clean: checkAndParseJson,
});

export const operationalLayers = input({
  label: "Operational Layers",
  type: "code",
  language: "json",
  required: false,
  default: OPERATIONAL_LAYERS_JSON_EXAMPLE,
  comments:
    "Operational layers contain business data which are used to make thematic maps, leave blank to use default values. You can check more information about the operational layers JSON object here: https://developers.arcgis.com/web-map-specification/objects/operationalLayers/",
  clean: checkAndParseJson,
});

export const parcelFabric = input({
  label: "Parcel Fabric",
  type: "code",
  language: "json",
  required: false,
  default: PARCEL_FABRIC_JSON_EXAMPLE,
  comments:
    "A Parcel Fabric object that the map can use to access Parcel Fabric related functionality, such as managing parcel records, leave blank to use default values. You can check more information about the parcel fabric JSON object here: https://developers.arcgis.com/web-map-specification/objects/parcelFabric/",
  clean: checkAndParseJson,
});

export const presentation = input({
  label: "Presentation",
  type: "code",
  language: "json",
  required: false,
  default: PRESENTATION_JSON_EXAMPLE,
  comments:
    "A presentation consists of multiple slides. Each slide has a different title, extent, basemap, layers, etc., leave blank to use default values. You can check more information about the presentation JSON object here: https://developers.arcgis.com/web-map-specification/objects/presentation/",
  clean: checkAndParseJson,
});

export const referenceScale = input({
  label: "Reference Scale",
  type: "string",
  required: false,
  example: "1.2",
  comments:
    "A floating-point number representing the reference scale which map symbols are drawn relative to. The number is the scale's denominator. When the reference scale is 0, symbols are always drawn at the same size regardless of the map scale. The referenceScale is only used for Feature Layers that have scaleSymbols:true. Not all applications or layer types support referenceScale yet. In particular, ArcGISOnline will not use the referenceScale when drawing symbols in the browser.",
  clean: parseFloatInput,
});

export const spatialReference = input({
  label: "Spatial Reference",
  type: "code",
  language: "json",
  required: true,
  default: SPATIAL_REFERENCE_JSON_EXAMPLE,
  comments:
    "An object used to specify the spatial reference of the given geometry, leave blank to use default values. You can check more information about the spatial reference JSON object here: https://developers.arcgis.com/web-map-specification/objects/spatialReference/",
  clean: checkAndParseJson,
});

export const tables = input({
  label: "Tables",
  type: "code",
  language: "json",
  required: false,
  default: TABLES_JSON_EXAMPLE,
  comments:
    "An array of objects representing non-spatial datasets used in the web map, leave blank to use default values. You can check more information about the tables JSON object here: https://developers.arcgis.com/web-map-specification/objects/table/",
  clean: checkAndParseJson,
});

export const timeZone = input({
  label: "Time Zone",
  type: "string",
  required: false,
  example: "system",
  comments:
    "Time zone of the webmap. When applicable, dates and times will be displayed using this time zone. The time zone can be system, unknown or any named IANA time zone.",
  clean: parseStringInput,
});

export const utilityNetworks = input({
  label: "Utility Networks",
  type: "code",
  language: "json",
  required: false,
  default: UTILITY_NETWORKS_JSON_EXAMPLE,
  comments:
    "An array of utility network objects the map can use to access utility-related functionality, such as tracing and querying associations, leave blank to use default values. You can check more information about the utility networks JSON object here: https://developers.arcgis.com/web-map-specification/objects/utilityNetwork/",
  clean: checkAndParseJson,
});

export const version = input({
  label: "Version",
  type: "string",
  required: true,
  example: "2.0",
  comments:
    "Root element in the web map specifying a string value indicating the web map version.",
  clean: parseStringInput,
});

export const widgets = input({
  label: "Widgets",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The widgets object contains widgets that should be exposed to the user, leave blank to use default values. You can check more information about the widgets JSON object here: https://developers.arcgis.com/web-map-specification/objects/widgets/",
  clean: checkAndParseJson,
});

export const addressSearch = input({
  label: "Address Search",
  type: "string",
  required: true,
  comments:
    "A single line of text representing an address or point of interest.",
  example: "380 New York St, Redlands, CA 92373",
  clean: util.types.toString,
});

export const featureServiceId = input({
  label: "Feature Service ID",
  type: "string",
  required: true,
  comments: "The ID of the feature service.",
  example: "345313e619df46f387f9ededbe15ac56",
  clean: util.types.toString,
  dataSource: "selectFeatureService",
});

export const format = input({
  label: "Export Format",
  type: "string",
  model: [
    { label: "Shapefile", value: "Shapefile" },
    { label: "CSV", value: "CSV" },
    { label: "File Geodatabase", value: "File Geodatabase" },
    { label: "Feature Collection", value: "Feature Collection" },
    { label: "GeoJson", value: "GeoJson" },
    { label: "Scene Package", value: "Scene Package" },
    { label: "KML", value: "KML" },
    { label: "Excel", value: "Excel" },
  ],
  required: true,
  comments: "The format to export the data to.",
  default: "CSV",
  clean: (formatString: unknown) =>
    util.types.toString(formatString) as ExportFormat,
});

export const layersToExport = input({
  label: "Layers to Export",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An array of exportLayerInfo JSON objects that controls which layers are exported. Leave blank to export all layers.",
  default: EXPORT_LAYERS_JSON_EXAMPLE,
  clean: checkAndParseJson,
});

export const serviceDescription = input({
  label: "Service Description",
  type: "string",
  required: false,
  comments: "Description given to the service.",
  example: "This is a feature service.",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A user-friendly description for the published dataset.",
  example: "A description of the dataset.",
  clean: util.types.toString,
});

export const start = input({
  label: "Start",
  type: "string",
  required: false,
  comments: "The start page number.",
  example: "1",
  clean: parseIntInput,
});

export const number = input({
  label: "Number",
  type: "string",
  required: false,
  comments:
    "The number of items to return. Too many results can crash the action, use a lower number if you are experiencing issues. The default is 10.",
  example: "2",
  clean: parseIntInput,
});

export const stringifyResult = input({
  label: "Stringify Result",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "If true, the result will be stringified. Use this if the result is too large and is causing the action to crash.",
  clean: util.types.toBool,
});

export const name = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The name of the layer.",
  example: "Acme_Layer",
  clean: util.types.toString,
});

export const defaultVisibility = input({
  label: "Default Visibility",
  type: "boolean",
  required: false,
  comments: "The default visibility of the layer.",
  default: "true",
  clean: util.types.toBool,
});

export const isDataVersioned = input({
  label: "Is Data Versioned",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Indicates whether the data is versioned.",
  clean: util.types.toBool,
});

export const supportsRollbackOnFailureParameter = input({
  label: "Supports Rollback On Failure Parameter",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Indicates whether the edits should be applied only if all submitted edits succeed. If false, the server will apply the edits that succeed even if some of the submitted edits fail. If true, the server will apply the edits only if all edits succeed.",
  clean: util.types.toBool,
});

export const supportsAdvancedQueries = input({
  label: "Supports Advanced Queries",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Indicates whether the layer supports advanced queries. If true, the layer supports advanced queries.",
  clean: util.types.toBool,
});

export const geometryType = input({
  label: "Geometry Type",
  type: "string",
  required: true,
  comments: "The geometry type of the layer.",
  example: "esriGeometryPoint",
  default: "esriGeometryPoint",
  clean: util.types.toString,
});

export const minScale = input({
  label: "Min Scale",
  type: "string",
  required: false,
  default: "0",
  comments:
    "The minimum scale (most zoomed out) at which the layer is visible in the view. If the map is zoomed out beyond this scale, the layer will not be visible. A value of 0 means the layer does not have a minimum scale. The minScale value should always be larger than the maxScale value, and lesser than or equal to the service specification.",
  example: "0",
  clean: parseIntInput,
});

export const maxScale = input({
  label: "Max Scale",
  type: "string",
  required: false,
  default: "0",
  comments:
    "The maximum scale (most zoomed in) at which the layer is visible in the view. If the map is zoomed in beyond this scale, the layer will not be visible. A value of 0 means the layer does not have a maximum scale. The maxScale value should always be smaller than the minScale value, and greater than or equal to the service specification.",
  example: "0",
  clean: parseIntInput,
});

export const extent = input({
  label: "Extent",
  type: "code",
  language: "json",
  required: false,
  default: EXTENT_JSON_EXAMPLE,
  comments:
    "The extent of the layer. If provided, the layer will only be visible within the extent.",
  clean: checkAndParseJson,
});

export const drawingInfo = input({
  label: "Drawing Info",
  type: "code",
  language: "json",
  required: false,
  default: DRAWING_INFO_JSON_EXAMPLE,
  comments:
    "The drawing information for the layer. This includes the renderer, labeling info, transparency, scale symbols, etc.",
  clean: checkAndParseJson,
});

export const allowGeometryUpdates = input({
  label: "Allow Geometry Updates",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Allow geometry updates allows editors to edit the geometry of a feature in the feature service. This is enabled by default. If you disable this option, editors can update only the nonspatial attributes of features in the feature service.",
  clean: util.types.toBool,
});

export const hasAttachments = input({
  label: "Has Attachments",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Indicates whether the layer has attachments. If true, the layer supports attachments.",
  clean: util.types.toBool,
});

export const htmlPopupType = input({
  label: "HTML Popup Type",
  type: "string",
  required: false,
  default: "esriServerHTMLPopupTypeNone",
  comments:
    "The type of pop-up window that is used for the layer. The default is esriServerHTMLPopupTypeNone.",
  clean: parseStringInput,
});

export const hasM = input({
  label: "Has M",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Indicates whether the client-side features in the layer have M (measurement) values.",
  clean: util.types.toBool,
});

export const hasZ = input({
  label: "Has Z",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Indicates whether the client-side features in the layer have Z (elevation) values.",
  clean: util.types.toBool,
});

export const objectIdField = input({
  label: "Object ID Field",
  type: "string",
  required: false,
  default: "OBJECTID",
  comments: "The object ID field of the layer.",
  example: "OBJECTID",
  clean: parseStringInput,
});

export const fields = input({
  label: "Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "The fields of the layer.",
  default: FIELDS_JSON_EXAMPLE,
  clean: checkAndParseJson,
});

export const templates = input({
  label: "Templates",
  type: "code",
  language: "json",
  required: false,
  default: TEMPLATES_JSON_EXAMPLE,
  comments: "The templates of the layer.",
  clean: checkAndParseJson,
});

export const supportedQueryFormats = input({
  label: "Supported Query Formats",
  type: "string",
  required: false,
  default: "JSON",
  comments: "The supported query formats for the layer. The default is 'JSON'.",
  clean: parseStringInput,
});

export const hasStaticData = input({
  label: "Has Static Data",
  type: "boolean",
  required: false,
  default: "true",
  comments: "Indicates whether the layer has static data.",
  clean: util.types.toBool,
});

export const maxRecordCount = input({
  label: "Max Record Count",
  type: "string",
  required: false,
  default: "1000",
  comments:
    "The maximum number of records that will be returned for a given query.",
  clean: parseIntInput,
});

export const capabilities = input({
  label: "Capabilities",
  type: "string",
  required: false,
  default: "Query,Extract",
  comments:
    "A comma-separated list of supported operations. The default is 'Query,Extract'.",
  clean: parseStringInput,
});

export const viewingRoutingEnabled = input({
  label: "Enabled Routing On View",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Indicates whether the routing is enabled on the view. The default is true.",
  clean: util.types.toBool,
});

export const viewingMeasureEnabled = input({
  label: "Enabled Measure On View",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Indicates whether the measure is enabled on the view. The default is true.",
  clean: util.types.toBool,
});

export const viewingBasemapGalleryEnabled = input({
  label: "Enabled Basemap Gallery On View",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Indicates whether the basemap gallery is enabled on the view. The default is true.",
  clean: util.types.toBool,
});

export const searchEnabled = input({
  label: "Enabled Search",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "A boolean value indicating whether search (find) functionality is enabled in the web map.",
  clean: util.types.toBool,
});

export const searchDisablePlaceFinder = input({
  label: "Disable Place Finder",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "A boolean value indicating whether or not to disable the place finder.",
  clean: util.types.toBool,
});

export const searchHintText = input({
  label: "Search Hint Text",
  type: "string",
  required: false,
  default: "Search",
  comments:
    "A string value used to indicate the hint provided with the search dialog.",
  clean: parseStringInput,
});

export const searchLayers = input({
  label: "Search Layers",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An array of objects that define search fields and search criteria for layers in the web map.",
  default: SEARCH_LAYERS_JSON_EXAMPLE,
  clean: checkAndParseJson,
});

export const searchTables = input({
  label: "Search Tables",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An array of objects that define search fields and search criteria for tables in the web map.",
  default: SEARCH_TABLES_JSON_EXAMPLE,
  clean: checkAndParseJson,
});

export const editingLocationTrackingEnabled = input({
  label: "Enabled Location Tracking",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "A boolean value indicating whether or not location tracking is enabled on the webmap.",
  clean: util.types.toBool,
});

export const editingLocationTrackingInfo = input({
  label: "Location Tracking Info",
  type: "code",
  language: "json",
  comments:
    "An object of additional information specifying layer and update interval time.",
  required: false,
  default: LOCATION_TRACKING_INFO_JSON_EXAMPLE,
  clean: checkAndParseJson,
});

export const baseUrl = input({
  label: "Base URL",
  type: "string",
  required: true,
  comments: "The base URL of the ArcGIS REST API. ",
  example:
    "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
  clean: util.types.toString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "If true, all results will be fetched. If false, only the first page will be fetched.",
  clean: util.types.toBool,
});
