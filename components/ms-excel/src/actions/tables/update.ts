import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { updateWorksheetsTablesInputs } from "../../inputs/tables/update";
import { getTableExamplePayload as updateTablesExamplePayload } from "../../examplePayloads/tables";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const updateTable = action({
  display: {
    label: "Update Table",
    description: "Updates a table object from a worksheet.",
  },
  perform: async (
    context,
    {
      connection,
      workbookId,
      worksheetId,
      name,
      showHeaders,
      showTotals,
      style,
      tableId,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.patch(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}`,
      {
        name,
        showHeaders,
        showTotals,
        style,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateWorksheetsTablesInputs,
  },
  examplePayload: { data: updateTablesExamplePayload },
});
