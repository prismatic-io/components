import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTablesInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
export const listTables = action({
  display: {
    description: "Lists all tables in the specified dataset.",
    label: "List Tables",
  },
  inputs: listTablesInputs,
  perform: async (
    _context,
    { connectionInput, datasetId, projectId, pagination = {}, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    return await paginateResults(
      (params) => client.tables.list(params),
      {
        datasetId,
        projectId,
        ...(pagination.maxResults && {
          maxResults: util.types.toNumber(pagination.maxResults),
        }),
        ...(pagination.pageToken && { pageToken: pagination.pageToken }),
      },
      fetchAll,
      "tables",
    );
  },
});
