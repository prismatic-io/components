import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getWorksheetExamplePayload as createWorksheetExamplePayload } from "../../examplePayloads/worksheets";
import { createWorksheetsInputs } from "../../inputs/worksheets/create";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const createWorksheet = action({
  display: {
    label: "Create Worksheet",
    description: "Creates a worksheet object inside a workbook.",
  },
  perform: async (context, { connection, workbookId, name, driveOrSiteId }) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.post(`${baseUrl}/worksheets/add`, {
      name,
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createWorksheetsInputs,
  },
  examplePayload: { data: createWorksheetExamplePayload },
});
