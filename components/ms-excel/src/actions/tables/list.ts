import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getDriveOrSiteBaseUrl, paginateResults } from "../../helpers";
import { listWorksheetsTablesInputs } from "../../inputs/tables/list";
import { listTablesExamplePayload } from "../../examplePayloads/tables";
export const listTables = action({
  display: {
    label: "List Tables",
    description: "Retrieve a list of tables from a worksheet.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      pagination = {},
      filters = {},
      $select,
      $expand,
      $format,
      workbookId,
      worksheetId,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);
    const data = await paginateResults(
      client,
      `${baseUrl}/worksheets/${worksheetId}/tables`,
      fetchAll,
      { ...pagination, ...filters, $select, $expand, $format },
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...listWorksheetsTablesInputs,
  },
  examplePayload: { data: listTablesExamplePayload },
});
