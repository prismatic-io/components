import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DELETE_CONTENT_RESPONSE } from "../../examplePayloads/general";
import { deleteColumnInputs } from "../../inputs/columns/delete";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const deleteColumn = action({
  display: {
    label: "Delete Column",
    description: "Deletes a column object from a worksheet table.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, tableId, columnId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    await client.delete(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/columns/${columnId}`,
    );

    return {
      data: DELETE_CONTENT_RESPONSE,
    };
  },
  inputs: {
    connection,
    ...deleteColumnInputs,
  },
  examplePayload: { data: DELETE_CONTENT_RESPONSE },
});
