import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, odataParams, fetchAll } from "../../inputs/general";
import { listMobileAppsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listMobileApps = action({
  display: {
    label: "List Mobile Apps",
    description: "Retrieve a list of mobile apps.",
  },
  perform: async (
    context,
    {
      connection,
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
      fetchAll,
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
  },
  examplePayload: listMobileAppsExamplePayload,
});
