import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getRowExamplePayload as createRowExamplePayload } from "../../examplePayloads/rows";
import { createRowInputs } from "../../inputs/rows/create";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const createMultipleRows = action({
  display: {
    label: "Create Multiple Rows",
    description: "Adds rows to the end of a table.",
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
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/rows`,
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
    values: {
      ...createRowInputs.values,
      required: false,
    },
  },
  examplePayload: { data: createRowExamplePayload },
});
