import { addFeatures as addFeaturesEsri } from "@esri/arcgis-rest-feature-service";
import { action } from "@prismatic-io/spectral";
import { ADD_FEATURES_EXAMPLE_PAYLOAD } from "../examplePayloads";
import {
  connection,
  featureServiceLayerId,
  featureServiceUrl,
  featuresToAdd,
} from "../inputs";
import { getApiKeyManager } from "../utils";

export const addFeatures = action({
  display: {
    label: "Add Features (Geometry objects or Feature Attributes)",
    description: "Add features to a hosted feature layer.",
  },
  perform: async (
    context,
    { connection, featureServiceLayerId, featureServiceUrl, featuresToAdd },
  ) => {
    const authentication = getApiKeyManager(connection);
    const url = `${featureServiceUrl}/${featureServiceLayerId}`;
    const features = { features: featuresToAdd };

    if (context.debug.enabled) {
      context.logger.debug(`url: ${url}`);
      context.logger.debug(JSON.stringify(features));
    }

    const data = await addFeaturesEsri({
      url,
      ...features,
      authentication,
    });

    return { data: data as unknown };
  },
  inputs: {
    connection,
    featureServiceLayerId,
    featuresToAdd,
    featureServiceUrl,
  },
  examplePayload: { data: ADD_FEATURES_EXAMPLE_PAYLOAD },
});
