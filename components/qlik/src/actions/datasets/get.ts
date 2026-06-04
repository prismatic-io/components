import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDatasetExamplePayload } from "../../examplePayloads";
import { connectionInput, dataSetId, projections } from "../../inputs";

export const getDataset = action({
  display: {
    label: "Get Data Set",
    description: "Get data set by ID.",
  },
  examplePayload: getDatasetExamplePayload,
  perform: async (context, { connection, dataSetId, projections }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/data-sets/${dataSetId}`, {
      params: {
        projections: projections || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataSetId,
    projections,
  },
});
