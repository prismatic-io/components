import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTableInputs } from "../../inputs";
export const getTable = action({
  display: {
    description: "Gets the specified table resource by table ID.",
    label: "Get Table",
  },
  inputs: getTableInputs,
  perform: async (
    _context,
    { connectionInput, datasetId, projectId, tableId, selectedFields, view },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.tables.get({
      datasetId,
      projectId,
      tableId,
      selectedFields: selectedFields || undefined,
      view: view || undefined,
    });
    return {
      data,
    };
  },
});
