import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteOrganizationInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteOrganizationExamplePayload } from "../../examplePayloads";
import { deleteOrganizationOutputSchema } from "../../outputSchemas";
export const deleteOrganization = action({
  display: {
    label: "Delete Organization",
    description: "Deletes an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`/organizations/${id}`);
    return { data };
  },
  inputs: deleteOrganizationInputs,
  examplePayload: deleteOrganizationExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteOrganizationOutputSchema,
  }),
});
