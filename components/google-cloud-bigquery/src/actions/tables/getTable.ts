import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  datasetId,
  projectId,
  selectedFields,
  tableId,
  view,
} from "../../inputs";

export const getTable = action({
  display: {
    description: "Gets the specified table resource by table ID.",
    label: "Get Table",
  },
  inputs: {
    connectionInput,
    datasetId: input({
      ...datasetId,
      required: true,
      comments: "Dataset ID of the requested table.",
    }),
    projectId: input({
      ...projectId,
      required: true,
      comments: "Project ID of the requested table.",
    }),
    tableId: input({
      ...tableId,
      required: true,
      comments: "Table ID of the requested table.",
    }),
    selectedFields,
    view,
  },
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
