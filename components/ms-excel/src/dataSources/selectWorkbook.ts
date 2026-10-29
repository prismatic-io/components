import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getPathUrl, isExcelWorkbook, paginateResults } from "../helpers";
import type { DriveItem } from "../interfaces";
import { selectWorkbookInputs } from "../inputs/workbooks/list";

export const selectWorkbook = dataSource({
  display: {
    label: "Select Workbook",
    description: "Select a workbook from the list of workbooks.",
  },
  inputs: selectWorkbookInputs,
  perform: async (
    _context,
    { connection, driveOrSiteId, listOrItemId, path },
  ) => {
    const { client, source } = createClient(connection, false);

    const url = getPathUrl(source, path, driveOrSiteId, listOrItemId);

    const data = await paginateResults<DriveItem>(client, url, true, {});
    const workbooks =
      data.value && data.value.length > 0
        ? data.value.filter(isExcelWorkbook)
        : [];

    const result = workbooks.map<Element>((workbook) => ({
      label: workbook.name,
      key: workbook.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
