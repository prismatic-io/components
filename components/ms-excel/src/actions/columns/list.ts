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
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/columns`,
      fetchAll,
      params,
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
