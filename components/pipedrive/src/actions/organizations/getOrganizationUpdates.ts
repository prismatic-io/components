import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationUpdatesInputs } from "../../inputs";
import { getOrganizationUpdatesExamplePayload } from "../../examplePayloads";
import { getOrganizationUpdatesOutputSchema } from "../../outputSchemas";
export const getOrganizationUpdates = action({
  display: {
    label: "Get Organization Updates",
    description: "Lists updates about an organization.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {}, allChanges, items },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organizations/${id}/flow`, {
      params: { start, limit, all_changes: allChanges, items },
    });
    return { data };
  },
  inputs: getOrganizationUpdatesInputs,
  examplePayload: getOrganizationUpdatesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationUpdatesOutputSchema,
  }),
});
