import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getColumnInputs } from "../../inputs/columns/get";
import { getColumnExamplePayload } from "../../examplePayloads/columns";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const getColumn = action({
  display: {
    label: "Get Column",
    description: "Retrieves a column object from a worksheet table.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, tableId, columnId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.get(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/columns/${columnId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getColumnInputs,
  },
  examplePayload: { data: getColumnExamplePayload },
});
