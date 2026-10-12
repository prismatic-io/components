import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationMailMessagesInputs } from "../../inputs";
import { getOrganizationMailMessagesExamplePayload } from "../../examplePayloads";
import { getOrganizationMailMessagesOutputSchema } from "../../outputSchemas";
export const getOrganizationMailMessages = action({
  display: {
    label: "Get Organization Mail Messages",
    description: "Lists mail messages associated with an organization.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organizations/${id}/mailMessages`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getOrganizationMailMessagesInputs,
  examplePayload: getOrganizationMailMessagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationMailMessagesOutputSchema,
  }),
});
