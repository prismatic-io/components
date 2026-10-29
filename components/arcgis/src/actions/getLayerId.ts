import { getAllLayersAndTables } from "@esri/arcgis-rest-feature-service";
import { action } from "@prismatic-io/spectral";
import { GET_LAYER_ID_EXAMPLE_PAYLOAD } from "../examplePayloads";
import { connection, featureLayerName, featureServiceUrl } from "../inputs";
import { getApiKeyManager } from "../utils";

export const getLayerId = action({
  display: {
    label: "Get Layer ID",
    description:
      "Get a layer ID from a hosted feature service (can get multiple layers if they have the same name).",
  },
  perform: async (
    _context,
    { connection, featureServiceUrl, featureLayerName },
  ) => {
    const authentication = getApiKeyManager(connection);

    const getAllLayersAndTablesResult = await getAllLayersAndTables({
      authentication,
      url: featureServiceUrl,
    });

    const foundLayers = getAllLayersAndTablesResult.layers
      .filter((layer) => layer.name === featureLayerName)
      .map((layer) => ({ id: layer.id, name: layer.name }));

    return { data: foundLayers };
  },
  inputs: {
    connection,
    featureServiceUrl,
    featureLayerName,
  },
  examplePayload: { data: GET_LAYER_ID_EXAMPLE_PAYLOAD },
});
