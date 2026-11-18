import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listMobileAppAssignmentsExamplePayload } from "../../examplePayloads";
import { listMobileAppAssignmentsInputs } from "../../inputs";
import { listMobileAppAssignmentsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util";

export const listMobileAppAssignments = action({
  display: {
    label: "List Mobile App Assignments",
    description: "List all assignments for a mobile app.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMobileAppAssignmentsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, mobileAppId, fetchAll, pagination, filters },
  ) => {
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
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments`,
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  examplePerform: async () => listMobileAppAssignmentsExamplePayload,
  inputs: listMobileAppAssignmentsInputs,
  examplePayload: listMobileAppAssignmentsExamplePayload,
});
