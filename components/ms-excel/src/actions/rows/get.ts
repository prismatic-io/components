import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getRowsInputs } from "../../inputs/rows/get";
import { getRowExamplePayload } from "../../examplePayloads/rows";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const getRow = action({
  display: {
    label: "Get Row",
    description: "Retrieves a row object from a worksheet table.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, tableId, rowId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.get(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/rows/${rowId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getRowsInputs,
  },
  examplePayload: { data: getRowExamplePayload },
});
