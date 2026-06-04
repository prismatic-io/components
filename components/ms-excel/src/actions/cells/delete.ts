import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DELETE_CONTENT_RESPONSE } from "../../examplePayloads/general";
import { deleteCellRangeInputs } from "../../inputs/cells/delete";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const deleteCellRange = action({
  display: {
    label: "Delete Cell Range",
    description: "Deletes the cells associated with the range.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, shift, address, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    await client.post(
      `${baseUrl}/worksheets/${worksheetId}/range(address='${address}')/delete`,
      {
        shift,
      },
    );

    return {
      data: DELETE_CONTENT_RESPONSE,
    };
  },
  inputs: {
    connection,
    ...deleteCellRangeInputs,
  },
  examplePayload: { data: DELETE_CONTENT_RESPONSE },
});
