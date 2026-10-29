import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getWorksheetsInputs } from "../../inputs/worksheets/get";
import { getWorksheetExamplePayload } from "../../examplePayloads/worksheets";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const getWorksheet = action({
  display: {
    label: "Get Worksheet",
    description: "Retrieves a worksheet object from a workbook.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.get(`${baseUrl}/worksheets/${worksheetId}`);

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getWorksheetsInputs,
  },
  examplePayload: { data: getWorksheetExamplePayload },
});
