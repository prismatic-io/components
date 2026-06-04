import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectColumnInputs } from "../inputs/columns/list";
import { createClient } from "../client";
import { getDriveOrSiteBaseUrl, paginateResults } from "../helpers";
import type { Column } from "../interfaces";

export const selectColumn = dataSource({
  display: {
    label: "Select Column",
    description: "Select a column from the list of columns.",
  },
  inputs: selectColumnInputs,
  perform: async (
    _context,
    { connection, workbookId, worksheetId, tableId, driveOrSiteId },
  ) => {
    const { client, source } = createClient(connection, false);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const data = await paginateResults<Column>(
      client,
      `${baseUrl}/worksheets/${worksheetId}/tables/${tableId}/columns`,
      true,
      {},
    );
    const result = data.value.map<Element>((column) => ({
      label: column.name,
      key: column.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
