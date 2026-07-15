import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDatasetInputs } from "../../inputs";
export const getDataset = action({
  display: {
    description: "Returns the dataset specified by datasetID.",
    label: "Get Dataset",
  },
  inputs: getDatasetInputs,
  perform: async (_context, { connectionInput, projectId, datasetId }) => {
    const client = createClient(connectionInput);
    const { data } = await client.datasets.get({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
    });
    return {
      data,
    };
  },
});
