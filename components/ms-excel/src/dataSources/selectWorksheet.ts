import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getDriveOrSiteBaseUrl, paginateResults } from "../helpers";
import type { Worksheet } from "../interfaces";
import { selectWorksheetInputs } from "../inputs/worksheets/list";

export const selectWorksheet = dataSource({
  display: {
    label: "Select Worksheet",
    description: "Select a worksheet from the list of worksheets.",
  },
  inputs: selectWorksheetInputs,
  perform: async (_context, { connection, workbookId, driveOrSiteId }) => {
    const { client, source } = createClient(connection, false);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const data = await paginateResults<Worksheet>(
      client,
      `${baseUrl}/worksheets`,
      true,
      {},
    );
    const result = data.value.map<Element>((worksheet) => ({
      label: worksheet.name,
      key: worksheet.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
