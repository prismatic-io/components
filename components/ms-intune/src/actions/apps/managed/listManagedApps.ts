import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection, odataParams, fetchAll } from "../../../inputs/general";
import { listManagedAppsExamplePayload } from "../../../examplePayloads";
import { MANAGED_APPS_FILTER } from "../../../constants";
import { paginateResults } from "../../../util";

export const listManagedApps = action({
  display: {
    label: "List Managed Apps",
    description: "List all managed apps in Intune.",
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
    const client = createClient(connection, context.debug.enabled, true);

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
      "/deviceAppManagement/mobileApps",
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
    $filter: { ...odataParams.$filter, default: MANAGED_APPS_FILTER },
  },
  examplePayload: listManagedAppsExamplePayload,
});
