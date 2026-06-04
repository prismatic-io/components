import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getWorksheetExamplePayload as updateWorksheetExamplePayload } from "../../examplePayloads/worksheets";
import { updateWorksheetsInputs } from "../../inputs/worksheets/update";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const updateWorksheet = action({
  display: {
    label: "Update Worksheet",
    description: "Updates a worksheet object from a workbook.",
  },
  perform: async (
    context,
    {
      connection,
      workbookId,
      worksheetId,
      name,
      position,
      visibility,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.patch(
      `${baseUrl}/worksheets/${worksheetId}`,
      {
        name,
        position,
        visibility,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateWorksheetsInputs,
  },
  examplePayload: { data: updateWorksheetExamplePayload },
});
