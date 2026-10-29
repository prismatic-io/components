import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getColumnExamplePayload as createColumnExamplePayload } from "../../examplePayloads/columns";
import { createColumnInputs } from "../../inputs/columns/create";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const createColumn = action({
  display: {
    label: "Create Column",
    description: "Creates a column object inside a worksheet table.",
  },
  perform: async (
    context,
    {
      connection,
      workbookId,
      worksheetId,
      columnId,
      tableId,
      values,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.post(
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/columns/add`,
      {
        values,
        index: columnId,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createColumnInputs,
  },
  examplePayload: { data: createColumnExamplePayload },
});
