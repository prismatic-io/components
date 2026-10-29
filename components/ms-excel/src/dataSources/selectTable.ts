import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getDriveOrSiteBaseUrl, paginateResults } from "../helpers";
import type { Table } from "../interfaces";
import { selectTableInputs } from "../inputs/tables/list";

export const selectTable = dataSource({
  display: {
    label: "Select Table",
    description: "Select a table from the list of tables.",
  },
  inputs: selectTableInputs,
  perform: async (
    _context,
    { connection, workbookId, worksheetId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, false);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const data = await paginateResults<Table>(
      client,
      `${baseUrl}/worksheets/${worksheetId}/tables`,
      true,
      {},
    );
    const result = data.value.map<Element>((table) => ({
      label: table.name,
      key: table.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
