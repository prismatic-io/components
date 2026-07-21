import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getDriveOrSiteBaseUrl, paginateResults } from "../../helpers";
import { listRowsInputs } from "../../inputs/rows/list";
import { listRowsExamplePayload } from "../../examplePayloads/rows";
export const listRows = action({
  display: {
    label: "List Rows",
    description: "Retrieve a list of rows from a worksheet table.",
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
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/rows`,
      fetchAll,
      { ...pagination, ...filters, $select, $expand, $format },
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...listRowsInputs,
  },
  examplePayload: { data: listRowsExamplePayload },
});
