import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTableDataInputs } from "../../inputs";
export const listTableData = action({
  display: {
    description:
      "Lists the content of a table in rows. Note: This action now uses jobs.query API as the tabledata.list API has been deprecated by Google.",
    label: "List Table Data (Deprecated)",
  },
  inputs: listTableDataInputs,
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      tableId,
      selectedFields,
      pagination = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const fields = selectedFields ? selectedFields : "*";
    const limitClause = pagination.maxResults
      ? ` LIMIT ${pagination.maxResults}`
      : "";
    const offsetClause = pagination.startIndex
      ? ` OFFSET ${pagination.startIndex}`
      : "";
    const query = `SELECT ${fields} FROM \`${projectId}.${datasetId}.${tableId}\`${limitClause}${offsetClause}`;
    const { data } = await client.jobs.query({
      projectId: projectId || undefined,
      requestBody: {
        query,
        useLegacySql: false,
        maxResults: pagination.maxResults || undefined,
      },
    });
    return {
      data,
    };
  },
});
