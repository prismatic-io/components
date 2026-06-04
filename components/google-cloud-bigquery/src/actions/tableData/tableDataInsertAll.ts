import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  datasetId,
  ignoreUnknownValues,
  kind,
  projectId,
  rows,
  skipInvalidRows,
  tableId,
  templateSuffix,
} from "../../inputs";

export const tableDataInsertAll = action({
  display: {
    description:
      "Streams data into BigQuery one record at a time without needing to run a load job.",
    label: "Table Data Insert All",
  },
  inputs: {
    connectionInput,
    datasetId,
    projectId,
    tableId,
    kind,
    skipInvalidRows,
    ignoreUnknownValues,
    templateSuffix,
    rows,
  },
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      tableId,
      kind,
      skipInvalidRows,
      ignoreUnknownValues,
      templateSuffix,
      rows,
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.tabledata.insertAll({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
      tableId: tableId || undefined,
      requestBody: {
        kind: kind || undefined,
        skipInvalidRows,
        ignoreUnknownValues,
        templateSuffix: templateSuffix || undefined,
        rows: rows || undefined,
      },
    });
    return {
      data,
    };
  },
});
