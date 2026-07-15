import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { tableDataInsertAllInputs } from "../../inputs";
export const tableDataInsertAll = action({
  display: {
    description:
      "Streams data into BigQuery one record at a time without needing to run a load job.",
    label: "Table Data Insert All",
  },
  inputs: tableDataInsertAllInputs,
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      tableId,
      rows,
      additionalFields = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.tabledata.insertAll({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
      tableId: tableId || undefined,
      requestBody: {
        kind: additionalFields.kind || undefined,
        skipInvalidRows: additionalFields.skipInvalidRows,
        ignoreUnknownValues: additionalFields.ignoreUnknownValues,
        templateSuffix: additionalFields.templateSuffix || undefined,
        rows: rows || undefined,
      },
    });
    return {
      data,
    };
  },
});
