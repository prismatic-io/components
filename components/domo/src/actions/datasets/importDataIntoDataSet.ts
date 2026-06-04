import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { importDataIntoDataSetInputs } from "../../inputs";
import { importDataIntoDataSetExamplePayload } from "../../examplePayloads";

export const importDataIntoDataSet = action({
  display: {
    label: "Import Data Into DataSet",
    description:
      "Imports data into a DataSet in a Domo instance, replacing the existing data.",
  },
  examplePayload: importDataIntoDataSetExamplePayload,
  perform: async (context, { connection, datasetId, csvBody }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/datasets/${datasetId}/data`,
      csvBody,
      { headers: { Accept: "application/json", "Content-Type": "text/csv" } },
    );
    return { data };
  },
  inputs: importDataIntoDataSetInputs,
});

export default { importDataIntoDataSet };
