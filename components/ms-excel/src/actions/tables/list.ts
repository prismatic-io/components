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
      `${baseUrl}/worksheets/${worksheetId}/tables`,
      fetchAll,
      params,
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
