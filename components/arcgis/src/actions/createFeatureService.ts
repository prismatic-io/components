import {
  createFeatureService as createFeatureServiceArgis,
  type ICreateServiceParams,
} from "@esri/arcgis-rest-feature-service";
import { action } from "@prismatic-io/spectral";
import { CREATE_FEATURE_SERVICE_EXAMPLE_PAYLOAD } from "../examplePayloads";
import {
  connection,
  description,
  featureServiceCapabilities,
  featureServiceName,
  serviceDescription,
} from "../inputs";
import { getIdentityManager } from "../utils";

export const createFeatureService = action({
  display: {
    label: "Create Feature Service",
    description: "Create a new hosted feature service.",
  },
  perform: async (
    context,
    {
      connection,
      featureServiceName,
      featureServiceCapabilities,
      description,
      serviceDescription,
    },
  ) => {
    const authentication = await getIdentityManager(connection);
    const item: { item: ICreateServiceParams } = {
      item: {
        name: featureServiceName,
        capabilities: featureServiceCapabilities,
        description: description || undefined,
        serviceDescription: serviceDescription || undefined,
      },
    };
    if (context.debug.enabled) {
      context.logger.debug(JSON.stringify(item));
    }

    const data = await createFeatureServiceArgis({
      authentication,
      ...item,
    });
    return { data };
  },
  inputs: {
    connection,
    featureServiceName: {
      ...featureServiceName,
      comments: "Name of the feature service to create.",
    },
    featureServiceCapabilities,
    description,
    serviceDescription,
  },
  examplePayload: { data: CREATE_FEATURE_SERVICE_EXAMPLE_PAYLOAD },
});
