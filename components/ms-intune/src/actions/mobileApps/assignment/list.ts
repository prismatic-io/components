import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection, odataParams, fetchAll } from "../../../inputs/general";
import { listMobileAppAssignmentsExamplePayload } from "../../../examplePayloads";
import { paginateResults } from "../../../util";
import { mobileAppId } from "../../../inputs/mobileApps/general";

export const listMobileAppAssignments = action({
  display: {
    label: "List Mobile App Assignments",
    description: "List all assignments for a mobile app.",
  },
  perform: async (
    context,
    {
      connection,
      mobileAppId,
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
      `/deviceAppManagement/mobileApps/${mobileAppId}/assignments`,
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    mobileAppId,
    fetchAll,
    ...odataParams,
  },
  examplePayload: listMobileAppAssignmentsExamplePayload,
});
