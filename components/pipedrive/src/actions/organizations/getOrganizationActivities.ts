import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationActivitiesInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getOrganizationActivitiesExamplePayload } from "../../examplePayloads";
import { getOrganizationActivitiesOutputSchema } from "../../outputSchemas";

export const getOrganizationActivities = action({
  display: {
    label: "Get Organization Activities",
    description: "Lists activities associated with an organization.",
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
      params: { limit, done, org_id: id, cursor },
    });
    return { data };
  },
  inputs: getOrganizationActivitiesInputs,
  examplePayload: getOrganizationActivitiesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationActivitiesOutputSchema,
  }),
});
