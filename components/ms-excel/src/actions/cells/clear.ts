import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { clearCellInputs } from "../../inputs/cells/clear";
import { CLEAR_CONTENT_RESPONSE } from "../../examplePayloads/general";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const clearCellRange = action({
  display: {
    label: "Clear Cell Range",
    description: "Clear range values such as format, fill, and border.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, applyTo, address, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    await client.post(
      `${baseUrl}/worksheets/${worksheetId}/range(address='${address}')/clear`,
      {
        applyTo,
      },
    );

    return {
      data: CLEAR_CONTENT_RESPONSE,
    };
  },
  inputs: {
    connection,
    ...clearCellInputs,
  },
  examplePayload: { data: CLEAR_CONTENT_RESPONSE },
});
