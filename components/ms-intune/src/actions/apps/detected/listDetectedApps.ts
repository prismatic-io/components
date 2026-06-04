import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection, odataParams, fetchAll } from "../../../inputs/general";
import { listDetectedAppsExamplePayload } from "../../../examplePayloads";
import { paginateResults } from "../../../util";

export const listDetectedApps = action({
  display: {
    label: "List Detected Apps",
    description:
      "List properties and relationships of the Detected Apps objects.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    };
    const data = await paginateResults(
      client,
      "/deviceManagement/detectedApps",
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    fetchAll,
    ...odataParams,
  },
  examplePayload: listDetectedAppsExamplePayload,
});
