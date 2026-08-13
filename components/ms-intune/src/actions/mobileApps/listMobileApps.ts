import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listMobileAppsExamplePayload } from "../../examplePayloads";
import { listMobileAppsInputs } from "../../inputs";
import { paginateResults } from "../../util";
export const listMobileApps = action({
  display: {
    label: "List Mobile Apps",
    description: "Retrieve a list of mobile apps.",
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
      ENDPOINTS.MOBILE_APPS,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listMobileAppsInputs,
  examplePayload: listMobileAppsExamplePayload,
});
