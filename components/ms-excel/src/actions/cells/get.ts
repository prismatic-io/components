import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getCellInputs } from "../../inputs/cells/get";
import { getCellsExamplePayload } from "../../examplePayloads/cells";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const getCell = action({
  display: {
    label: "Get Cell",
    description: "Retrieves a cell from a worksheet.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, column, row, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.get(
      `${baseUrl}/worksheets/${worksheetId}/range/cell(row=${row},column=${column})`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getCellInputs,
  },
  examplePayload: { data: getCellsExamplePayload },
});
