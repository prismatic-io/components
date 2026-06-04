import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getDriveOrSiteBaseUrl, paginateResults } from "../../helpers";
import { listWorksheetsInputs } from "../../inputs/worksheets/list";
import { listWorksheetsExamplePayload } from "../../examplePayloads/worksheets";

export const listWorksheets = action({
  display: {
    label: "List Worksheets",
    description: "Retrieve a list of worksheet objects.",
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
      $filter,
      $format,
      $search,
      $skip,
      workbookId,
      driveOrSiteId,
    },
  ) => {
    const { client, source } = createClient(connection, context.debug.enabled);
    const baseUrl = getDriveOrSiteBaseUrl(source, driveOrSiteId, workbookId);

    const params = {
      $skipToken,
      $expand,
      $orderBy,
      $select,
      $top,
      $filter,
      $format,
      $search,
      $skip,
    };

    const data = await paginateResults(
      client,
      `${baseUrl}/worksheets`,
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...listWorksheetsInputs,
  },
  examplePayload: { data: listWorksheetsExamplePayload },
});
