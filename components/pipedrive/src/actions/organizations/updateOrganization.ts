import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateOrganizationInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { updateOrganizationExamplePayload } from "../../examplePayloads";
import { singleOrganizationV2OutputSchema } from "../../outputSchemas";

export const updateOrganization = action({
  display: {
    label: "Update Organization",
    description: "Updates an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, name, ownerId, visibleTo }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.patch(`/organizations/${id}`, {
      name,
      owner_id: ownerId,
      visible_to: visibleTo,
    });
    return { data };
  },
  inputs: updateOrganizationInputs,
  examplePayload: updateOrganizationExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: singleOrganizationV2OutputSchema,
  }),
});
