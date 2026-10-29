import { addToServiceDefinition } from "@esri/arcgis-rest-feature-service";
import { action } from "@prismatic-io/spectral";
import { ADD_HOSTED_LAYER_TO_FEATURE_SERVICE_EXAMPLE_PAYLOAD } from "../examplePayloads";
import {
  allowGeometryUpdates,
  capabilities,
  connection,
  defaultVisibility,
  drawingInfo,
  extent,
  featureServiceUrl,
  fields,
  geometryType,
  hasAttachments,
  hasM,
  hasStaticData,
  hasZ,
  htmlPopupType,
  isDataVersioned,
  maxRecordCount,
  maxScale,
  minScale,
  name,
  objectIdField,
  supportedQueryFormats,
  supportsAdvancedQueries,
  supportsRollbackOnFailureParameter,
  templates,
} from "../inputs";
import { cleanUndefinedAttributes, getIdentityManager } from "../utils";

export const addHostedLayerToFeatureService = action({
  display: {
    label: "Add Hosted Layer to Feature Service",
    description: "Add a hosted layer to a hosted feature service.",
  },
  perform: async (
    context,
    {
      allowGeometryUpdates,
      capabilities,
      connection,
      defaultVisibility,
      drawingInfo,
      extent,
      featureServiceUrl,
      fields,
      geometryType,
      hasAttachments,
      hasM,
      hasStaticData,
      hasZ,
      htmlPopupType,
      isDataVersioned,
      maxRecordCount,
      maxScale,
      minScale,
      name,
      objectIdField,
      supportedQueryFormats,
      supportsAdvancedQueries,
      supportsRollbackOnFailureParameter,
      templates,
    },
  ) => {
    const authentication = await getIdentityManager(connection);
    const hostedLayerDefinition = cleanUndefinedAttributes({
      name,
      type: "Feature Layer",
      defaultVisibility,
      isDataVersioned,
      supportsRollbackOnFailureParameter,
      supportsAdvancedQueries,
      geometryType,
      minScale,
      maxScale,
      extent,
      drawingInfo,
      allowGeometryUpdates,
      hasAttachments,
      htmlPopupType,
      hasM,
      hasZ,
      objectIdField,
      fields,
      templates,
      supportedQueryFormats,
      hasStaticData,
      maxRecordCount,
      capabilities,
    });

    const layers = { layers: [hostedLayerDefinition] };

    if (context.debug.enabled) {
      context.logger.debug(`featureServiceUrl: ${featureServiceUrl}`);
      context.logger.debug(JSON.stringify(layers));
    }

    const data = await addToServiceDefinition(featureServiceUrl, {
      authentication,
      ...layers,
    });

    return { data };
  },
  inputs: {
    connection,
    name,
    featureServiceUrl,
    geometryType,
    allowGeometryUpdates,
    capabilities,
    defaultVisibility,
    drawingInfo,
    extent,
    fields,
    hasAttachments,
    hasM,
    hasStaticData,
    hasZ,
    htmlPopupType,
    isDataVersioned,
    maxRecordCount,
    maxScale,
    minScale,
    objectIdField,
    supportedQueryFormats,
    supportsAdvancedQueries,
    supportsRollbackOnFailureParameter,
    templates,
  },
  examplePayload: { data: ADD_HOSTED_LAYER_TO_FEATURE_SERVICE_EXAMPLE_PAYLOAD },
});
