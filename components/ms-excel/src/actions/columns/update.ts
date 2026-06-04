import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getColumnExamplePayload as updateColumnExamplePayload } from "../../examplePayloads/columns";
import { updateColumnInputs } from "../../inputs/columns/update";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const updateColumn = action({
  display: {
    label: "Update Column",
    description: "Updates a column object from a worksheet table.",
  },
  perform: async (
    context,
    {
      connection,
      workbookId,
      worksheetId,
      tableId,
      columnId,
      values,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.patch(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/columns/${columnId}`,
      {
        values,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateColumnInputs,
  },
  examplePayload: { data: updateColumnExamplePayload },
});
