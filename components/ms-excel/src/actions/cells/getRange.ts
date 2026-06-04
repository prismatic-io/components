import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getCellsExamplePayload } from "../../examplePayloads/cells";
import { getCellRangeInputs } from "../../inputs/cells/getRange";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const getCellRange = action({
  display: {
    label: "Get Cell Range",
    description: "Retrieve the properties and relationships of a range object.",
  },
  perform: async (
    context,
    { connection, workbookId, worksheetId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.get(
      `${baseUrl}/worksheets/${worksheetId}/range`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getCellRangeInputs,
  },
  examplePayload: { data: getCellsExamplePayload },
});
