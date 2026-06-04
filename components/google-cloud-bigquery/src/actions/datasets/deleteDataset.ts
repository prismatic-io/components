import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, datasetId, projectId } from "../../inputs";

export const deleteDataset = action({
  display: {
    description:
      "Deletes the dataset specified by the datasetId value. Before you can delete a dataset, you must delete all its tables, either manually or by specifying deleteContents. Immediately after deletion, you can create another dataset with the same name.",
    label: "Delete Dataset",
  },
  inputs: {
    connectionInput,
    projectId,
    datasetId,
  },
  perform: async (_context, { connectionInput, projectId, datasetId }) => {
    const client = createClient(connectionInput);
    const { data } = await client.datasets.delete({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
    });
    return {
      data,
    };
  },
});
