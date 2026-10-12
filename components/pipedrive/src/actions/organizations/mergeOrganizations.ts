import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mergeOrganizationsInputs } from "../../inputs";
import { mergeOrganizationsExamplePayload } from "../../examplePayloads";
import { mergeOrganizationsOutputSchema } from "../../outputSchemas";
export const mergeOrganizations = action({
  display: {
    label: "Merge Organizations",
    description: "Merges two organizations.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, mergeWithId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/organizations/${id}/merge`, {
      merge_with_id: mergeWithId,
    });
    return { data };
  },
  inputs: mergeOrganizationsInputs,
  examplePayload: mergeOrganizationsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: mergeOrganizationsOutputSchema,
  }),
});
