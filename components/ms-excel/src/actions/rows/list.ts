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
      $skipToken,
      fetchAll,
      $expand,
      $orderBy,
      $select,
      $top,
      $filter,
      $format,
      $search,
      $skip,
      workbookId,
      worksheetId,
      tableId,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const params = {
      $skipToken,
      $expand,
      $orderBy,
      $select,
      $top,
      $filter,
      $format,
      $search,
      $skip,
    };

    const data = await paginateResults(
      client,
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/rows`,
      fetchAll,
      params,
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
