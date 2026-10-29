import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getActivitiesInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getActivitiesExamplePayload } from "../../examplePayloads";
import { getActivitiesOutputSchema } from "../../outputSchemas";

export const getActivities = action({
  display: {
    label: "Get Activities",
    description: "Gets all activities assigned to a particular user.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      filterId,
      pagination: { limit, cursor } = {},
      updatedSince,
      updatedUntil,
      sortBy,
      sortDirection,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/activities", {
      params: {
        filter_id: filterId,
        limit,
        updated_since: updatedSince,
        updated_until: updatedUntil,
        cursor,
        sort_by: sortBy,
        sort_direction: sortDirection,
      },
    });
    return { data };
  },
  inputs: getActivitiesInputs,
  examplePayload: getActivitiesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getActivitiesOutputSchema,
  }),
});
