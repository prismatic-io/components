import { createItem } from "@esri/arcgis-rest-portal";
import { action } from "@prismatic-io/spectral";
import { CREATE_WEB_MAP_EXAMPLE_PAYLOAD } from "../examplePayloads";
import {
  authoringApp,
  authoringAppVersion,
  background,
  baseMap,
  bookmarks,
  connection,
  editingLocationTrackingEnabled,
  editingLocationTrackingInfo,
  geotriggersInfo,
  initialState,
  mapFloorInfo,
  mapRangeInfo,
  operationalLayers,
  parcelFabric,
  presentation,
  referenceScale,
  searchDisablePlaceFinder,
  searchEnabled,
  searchHintText,
  searchLayers,
  searchTables,
  spatialReference,
  tables,
  timeZone,
  utilityNetworks,
  version,
  viewingBasemapGalleryEnabled,
  viewingMeasureEnabled,
  viewingRoutingEnabled,
  webMapName,
  widgets,
} from "../inputs";
import { cleanUndefinedAttributes, getIdentityManager } from "../utils";

export const createWebMap = action({
  display: {
    label: "Create Web Map",
    description: "Creates a web map.",
  },
  perform: async (
    context,
    {
      connection,
      authoringApp,
      authoringAppVersion,
      background,
      baseMap,
      bookmarks,
      geotriggersInfo,
      initialState,
      mapFloorInfo,
      mapRangeInfo,
      operationalLayers,
      parcelFabric,
      presentation,
      referenceScale,
      spatialReference,
      tables,
      timeZone,
      utilityNetworks,
      version,
      widgets,
      webMapName,
      editingLocationTrackingEnabled,
      editingLocationTrackingInfo,
      searchDisablePlaceFinder,
      searchEnabled,
      searchHintText,
      searchLayers,
      searchTables,
      viewingBasemapGalleryEnabled,
      viewingMeasureEnabled,
      viewingRoutingEnabled,
    },
  ) => {
    const authentication = await getIdentityManager(connection);

    const mapProperties = cleanUndefinedAttributes({
      applicationProperties: {
        viewing: {
          routing: {
            enabled: viewingRoutingEnabled,
          },
          measure: {
            enabled: viewingMeasureEnabled,
          },
          basemapGallery: {
            enabled: viewingBasemapGalleryEnabled,
          },
          search: {
            enabled: searchEnabled,
            disablePlaceFinder: searchDisablePlaceFinder,
            hintText: searchHintText,
            layers: searchLayers,
            tables: searchTables,
          },
        },
        editing: {
          locationTracking: {
            enabled: editingLocationTrackingEnabled,
            info: editingLocationTrackingInfo,
          },
        },
      },
      authoringApp,
      authoringAppVersion,
      background,
      baseMap,
      bookmarks,
      geotriggersInfo,
      initialState,
      mapFloorInfo,
      mapRangeInfo,
      operationalLayers,
      parcelFabric,
      presentation,
      referenceScale,
      spatialReference,
      tables,
      timeZone,
      utilityNetworks,
      version,
      widgets,
    });

    if (context.debug.enabled) {
      context.logger.debug(JSON.stringify({ mapProperties }));
    }

    const data = await createItem({
      item: {
        title: webMapName,
        type: "Web Map",
      },
      authentication,
      text: JSON.stringify(mapProperties),
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    webMapName,
    authoringApp,
    authoringAppVersion,
    baseMap,
    version,
    spatialReference,
    background,
    bookmarks,
    geotriggersInfo,
    initialState,
    mapFloorInfo,
    mapRangeInfo,
    operationalLayers,
    parcelFabric,
    presentation,
    referenceScale,
    tables,
    timeZone,
    utilityNetworks,
    widgets,
    editingLocationTrackingEnabled,
    editingLocationTrackingInfo,
    searchDisablePlaceFinder,
    searchEnabled,
    searchHintText,
    searchLayers,
    searchTables,
    viewingBasemapGalleryEnabled,
    viewingMeasureEnabled,
    viewingRoutingEnabled,
  },
  examplePayload: { data: CREATE_WEB_MAP_EXAMPLE_PAYLOAD },
});
