import { addFeatures } from "./addFeatures";
import { addHostedLayerToFeatureService } from "./addHostedLayerToFeatureService";
import { createFeatureService } from "./createFeatureService";
import { createWebMap } from "./createWebMap";
import { exportLayers } from "./exportLayers";
import { geocode } from "./geocode";
import { getAllLayersAndTables } from "./getAllLayersAndTables";
import { getFeatureServiceUrl } from "./getFeatureServiceUrl";
import { getLayerId } from "./getLayerId";
import { getSelf } from "./getSelf";
import { listFeatureServices } from "./listFeatureServices";
import { rawRequest } from "./rawRequest";
import { searchItems } from "./searchItems";

export default {
  addFeatures,
  getSelf,
  listFeatureServices,
  getFeatureServiceUrl,
  getAllLayersAndTables,
  getLayerId,
  createWebMap,
  searchItems,
  createFeatureService,
  addHostedLayerToFeatureService,
  geocode,
  exportLayers,
  rawRequest,
};
