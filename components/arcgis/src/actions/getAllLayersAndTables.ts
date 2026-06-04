import { getAllLayersAndTables as getAllLayersAndTablesEsri } from "@esri/arcgis-rest-feature-service";
import { action } from "@prismatic-io/spectral";
import { GET_ALL_LAYERS_AND_TABLES_EXAMPLE_PAYLOAD } from "../examplePayloads";
import { connection, featureServiceUrl } from "../inputs";
import { getApiKeyManager } from "../utils";

export const getAllLayersAndTables = action({
  display: {
    label: "List Layers and Tables",
    description: "Get all layers and tables from a hosted feature service.",
  },
  perform: async (_context, { connection, featureServiceUrl }) => {
    const authentication = getApiKeyManager(connection);

    const getAllLayersAndTablesResult = await getAllLayersAndTablesEsri({
      authentication,
      url: featureServiceUrl,
    });

    return {
      data: getAllLayersAndTablesResult as unknown,
    };
  },
  inputs: {
    connection,
    featureServiceUrl,
  },
  examplePayload: { data: GET_ALL_LAYERS_AND_TABLES_EXAMPLE_PAYLOAD },
});
