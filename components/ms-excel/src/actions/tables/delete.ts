import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DELETE_CONTENT_RESPONSE } from "../../examplePayloads/general";
import { deleteWorksheetsTablesInputs } from "../../inputs/tables/delete";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const deleteTable = action({
  display: {
    label: "Delete Table",
    description: "Deletes a table object from a worksheet.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, tableId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    await client.delete(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}`,
    );

    return {
      data: DELETE_CONTENT_RESPONSE,
    };
  },
  inputs: {
    connection,
    ...deleteWorksheetsTablesInputs,
  },
  examplePayload: { data: DELETE_CONTENT_RESPONSE },
});
