import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createWorksheetsTablesInputs } from "../../inputs/tables/create";
import { getTableExamplePayload as createTablesExamplePayload } from "../../examplePayloads/tables";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const createTable = action({
  display: {
    label: "Create Table",
    description: "Creates a table object inside a worksheet.",
  },
  perform: async (
    context,
    { connection, workbookId, address, hasHeaders, worksheetId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.post(
      `${baseUrl}/worksheets/${worksheetId}/tables/add`,
      {
        address,
        hasHeaders,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createWorksheetsTablesInputs,
  },
  examplePayload: { data: createTablesExamplePayload },
});
