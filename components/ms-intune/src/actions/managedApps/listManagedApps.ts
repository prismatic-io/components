import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listManagedAppsExamplePayload } from "../../examplePayloads";
import { listManagedAppsInputs } from "../../inputs";
import { paginateResults } from "../../util";
export const listManagedApps = action({
  display: {
    label: "List Managed Apps",
    description: "List all managed apps in Intune.",
  },
  perform: async (context, { connection, fetchAll, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled, true);
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
  inputs: listManagedAppsInputs,
  examplePayload: listManagedAppsExamplePayload,
});
