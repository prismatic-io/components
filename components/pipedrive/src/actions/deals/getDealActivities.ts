import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealActivitiesInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getDealActivitiesExamplePayload } from "../../examplePayloads";
import { getDealActivitiesOutputSchema } from "../../outputSchemas";
export const getDealActivities = action({
  display: {
    label: "Get Deal Activities",
    description: "Lists activities associated with a deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      pagination: { limit, cursor } = {},
      done,
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
        limit,
        done,
        deal_id: id,
        sort_by: sortBy,
        sort_direction: sortDirection,
        cursor,
      },
    });
    return { data };
  },
  inputs: getDealActivitiesInputs,
  examplePayload: getDealActivitiesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealActivitiesOutputSchema,
  }),
});
