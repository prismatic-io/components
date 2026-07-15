import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteTableInputs } from "../../inputs";
export const deleteTable = action({
  display: {
    description: "Deletes the table specified by table ID from the dataset.",
    label: "Delete Table",
  },
  inputs: deleteTableInputs,
  perform: async (
    _context,
    { connectionInput, datasetId, projectId, tableId },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.tables.delete({
      datasetId,
      projectId,
      tableId,
    });
    return {
      data,
    };
  },
});
