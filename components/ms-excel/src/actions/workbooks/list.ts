import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { listWorkbooksInputs } from "../../inputs/workbooks/list";
import { listWorkbooksExamplePayload } from "../../examplePayloads/workbooks";
import { getPathUrl, isExcelWorkbook, paginateResults } from "../../helpers";
import type { DriveItem } from "../../interfaces";

export const listWorkbooks = action({
  display: {
    label: "List Workbooks",
    description:
      "Returns a collection of workbooks from either a OneDrive or SharePoint site.",
  },
  perform: async (
    context,
    {
      connection,
      $skipToken,
      fetchAll,
      $expand,
      $orderBy,
      $select,
      $top,
      driveOrSiteId,
      listOrItemId,
      path,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);

    const params = {
      $skipToken,
      $expand,
      $orderBy,
      $select,
      $top,
    };

    const url = getPathUrl(source, path, driveOrSiteId, listOrItemId);

    const data = await paginateResults<DriveItem>(
      client,
      url,
      fetchAll,
      params,
    );
    const workbooks =
      data.value && data.value.length > 0
        ? data.value.filter(isExcelWorkbook)
        : [];
    return {
      data: { ...data, value: workbooks },
    };
  },
  inputs: {
    connection,
    ...listWorkbooksInputs,
  },
  examplePayload: { data: listWorkbooksExamplePayload },
});
