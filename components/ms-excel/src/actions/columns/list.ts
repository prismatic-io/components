import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { listColumnsInputs } from "../../inputs/columns/list";
import { listColumnsExamplePayload } from "../../examplePayloads/columns";
import { getDriveOrSiteBaseUrl, paginateResults } from "../../helpers";
export const listColumns = action({
  display: {
    label: "List Columns",
    description: "Retrieve a list of columns from a worksheet table.",
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
      tableId,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);
    const data = await paginateResults(
      client,
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/columns`,
      fetchAll,
      { ...pagination, ...filters, $select, $expand, $format },
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...listColumnsInputs,
  },
  examplePayload: { data: listColumnsExamplePayload },
});
