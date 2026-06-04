import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getRowExamplePayload as updateRowExamplePayload } from "../../examplePayloads/rows";
import { updateRowInputs } from "../../inputs/rows/update";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const updateRow = action({
  display: {
    label: "Update Row",
    description: "Updates a row object from a worksheet table.",
  },
  perform: async (
    context,
    {
      connection,
      workbookId,
      worksheetId,
      tableId,
      rowId,
      values,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.patch(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/rows/${rowId}`,
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
    ...updateRowInputs,
  },
  examplePayload: { data: updateRowExamplePayload },
});
