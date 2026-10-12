import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonActivitiesInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPersonActivitiesExamplePayload } from "../../examplePayloads";
import { getPersonActivitiesOutputSchema } from "../../outputSchemas";
export const getPersonActivities = action({
  display: {
    label: "Get Person Activities",
    description: "Lists activities associated with a person.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { limit, cursor } = {}, done },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/activities", {
      params: { limit, done, person_id: id, cursor },
    });
    return { data };
  },
  inputs: getPersonActivitiesInputs,
  examplePayload: getPersonActivitiesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonActivitiesOutputSchema,
  }),
});
