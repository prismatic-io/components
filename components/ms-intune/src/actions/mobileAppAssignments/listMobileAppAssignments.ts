import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listMobileAppAssignmentsExamplePayload } from "../../examplePayloads";
import { listMobileAppAssignmentsInputs } from "../../inputs";
import { paginateResults } from "../../util";
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
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments`,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listMobileAppAssignmentsInputs,
  examplePayload: listMobileAppAssignmentsExamplePayload,
});
