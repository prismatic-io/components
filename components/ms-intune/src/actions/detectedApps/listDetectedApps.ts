import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDetectedAppsExamplePayload } from "../../examplePayloads";
import { listDetectedAppsInputs } from "../../inputs";
import { paginateResults } from "../../util";
export const listDetectedApps = action({
  display: {
    label: "List Detected Apps",
    description:
      "List properties and relationships of the Detected Apps objects.",
  },
  perform: async (context, { connection, fetchAll, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: filters.$filter,
      $select: filters.$select,
      $expand: filters.$expand,
      $orderBy: filters.$orderBy,
      $top: pagination.$top,
      $skip: pagination.$skip,
      $count: filters.$count,
      $search: filters.$search,
      $format: filters.$format,
      $skipToken: pagination.$skipToken,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.DETECTED_APPS,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listDetectedAppsInputs,
  examplePayload: listDetectedAppsExamplePayload,
});
