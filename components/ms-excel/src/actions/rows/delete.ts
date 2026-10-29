import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DELETE_CONTENT_RESPONSE } from "../../examplePayloads/general";
import { deleteRowsInputs } from "../../inputs/rows/delete";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const deleteRow = action({
  display: {
    label: "Delete Row",
    description: "Deletes a row object from a worksheet table.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, tableId, rowId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    await client.delete(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/rows/${rowId}`,
    );

    return {
      data: DELETE_CONTENT_RESPONSE,
    };
  },
  inputs: {
    connection,
    ...deleteRowsInputs,
  },
  examplePayload: { data: DELETE_CONTENT_RESPONSE },
});
