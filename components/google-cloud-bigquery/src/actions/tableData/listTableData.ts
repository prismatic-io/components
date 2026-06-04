import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  datasetId,
  maxResults,
  pageToken,
  projectId,
  selectedFields,
  startIndex,
  tableId,
} from "../../inputs";

export const listTableData = action({
  display: {
    description:
      "Lists the content of a table in rows. Note: This action now uses jobs.query API as the tabledata.list API has been deprecated by Google.",
    label: "List Table Data (Deprecated)",
  },
  inputs: {
    connectionInput,
    datasetId,
    projectId,
    tableId,
    startIndex,
    maxResults,
    pageToken,
    selectedFields: {
      ...selectedFields,
      comments:
        "Subset of fields to return, supports select into sub fields. Example: selectedFields = 'a,e.d.f';",
    },
  },
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      tableId,
      startIndex,
      maxResults,
      
      selectedFields,
    },
  ) => {
    const client = createClient(connectionInput);

    
    const fields = selectedFields ? selectedFields : "*";
    const limitClause = maxResults ? ` LIMIT ${maxResults}` : "";
    const offsetClause = startIndex ? ` OFFSET ${startIndex}` : "";
    const query = `SELECT ${fields} FROM \`${projectId}.${datasetId}.${tableId}\`${limitClause}${offsetClause}`;

    
    
    const { data } = await client.jobs.query({
      projectId: projectId || undefined,
      requestBody: {
        query,
        useLegacySql: false,
        maxResults: maxResults || undefined,
      },
    });

    return {
      data,
    };
  },
});
