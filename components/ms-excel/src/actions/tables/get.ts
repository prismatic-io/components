import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getWorksheetsTablesInputs } from "../../inputs/tables/get";
import { getTableExamplePayload } from "../../examplePayloads/tables";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const getTable = action({
  display: {
    label: "Get Table",
    description: "Retrieves a table object from a worksheet.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, tableId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.get(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getWorksheetsTablesInputs,
  },
  examplePayload: { data: getTableExamplePayload },
});
