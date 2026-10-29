import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { updateCellInputs } from "../../inputs/cells/update";
import { getCellsExamplePayload as updateCellsExamplePayload } from "../../examplePayloads/cells";
import { getDriveOrSiteBaseUrl } from "../../helpers";

export const updateCellRange = action({
  display: {
    label: "Update Cell Range",
    description: "Update the properties of a range object.",
  },
  perform: async (
    context,
    {
      connection,
      workbookId,
      worksheetId,
      values,
      columnHidden,
      formulas,
      formulasLocal,
      formulasR1C1,
      numberFormat,
      rowHidden,
      address,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const { data } = await client.patch(
      `${baseUrl}/worksheets/${worksheetId}/range(address='${address}')`,
      {
        values,
        columnHidden,
        formulas,
        formulasLocal,
        formulasR1C1,
        numberFormat,
        rowHidden,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateCellInputs,
  },
  examplePayload: { data: updateCellsExamplePayload },
});
