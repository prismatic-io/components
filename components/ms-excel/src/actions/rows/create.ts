import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getRowExamplePayload as createRowExamplePayload } from "../../examplePayloads/rows";
import { createRowInputs } from "../../inputs/rows/create";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const createRow = action({
  display: {
    label: "Create Row",
    description: "Creates a row object inside a worksheet table.",
  },
  perform: async (
    context,
    {
      connection,
      workbookId,
      worksheetId,
      rowId,
      tableId,
      values,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.post(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/rows/add`,
      {
        values,
        index: rowId,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createRowInputs,
  },
  examplePayload: { data: createRowExamplePayload },
});
