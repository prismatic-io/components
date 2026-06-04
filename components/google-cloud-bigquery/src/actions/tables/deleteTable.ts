import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, datasetId, projectId, tableId } from "../../inputs";

export const deleteTable = action({
  display: {
    description: "Deletes the table specified by table ID from the dataset.",
    label: "Delete Table",
  },
  inputs: {
    connectionInput,
    datasetId: input({
      ...datasetId,
      required: true,
      comments: "Dataset ID of the table to delete.",
    }),
    projectId: input({
      ...projectId,
      required: true,
      comments: "Project ID of the table to delete.",
    }),
    tableId: input({
      ...tableId,
      required: true,
      comments: "Table ID of the table to delete.",
    }),
  },
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
