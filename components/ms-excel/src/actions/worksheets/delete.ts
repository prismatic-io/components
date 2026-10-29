import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { deleteWorksheetsInputs } from "../../inputs/worksheets/delete";
import { DELETE_CONTENT_RESPONSE } from "../../examplePayloads/general";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const deleteWorksheet = action({
  display: {
    label: "Delete Worksheet",
    description: "Deletes a worksheet from a workbook.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    await client.delete(`${baseUrl}/worksheets/${worksheetId}`);

    return {
      data: DELETE_CONTENT_RESPONSE,
    };
  },
  inputs: {
    connection,
    ...deleteWorksheetsInputs,
  },
  examplePayload: { data: DELETE_CONTENT_RESPONSE },
});
