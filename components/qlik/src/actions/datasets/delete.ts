import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDatasetExamplePayload } from "../../examplePayloads";
import { connectionInput, dataSetIds } from "../../inputs";

export const deleteDataset = action({
  display: {
    label: "Delete Data Set",
    description: "Delete data set by ID.",
  },
  examplePayload: deleteDatasetExamplePayload,
  perform: async (context, { connection, dataSetIds }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/data-sets`, {
      data: {
        ids: dataSetIds || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataSetIds,
  },
});
