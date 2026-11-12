import { action, outputSchema } from "@prismatic-io/spectral";
import { getContactOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getContactInputs } from "../../inputs";
import { getContactExamplePayload } from "../../examplePayloads";

export const getContact = action({
  display: {
    label: "Get Contact",
    description:
      "This method returns one or more contacts associated with a DocuSign account.",
  },
  performSafety: "safe",
  perform: async (context, { connection, contactId, cloudProvider }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/contacts/${contactId}`, {
      params: {
        cloud_provider: cloudProvider || undefined,
      },
    });
    return { data };
  },
  inputs: getContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getContactOutputSchema,
  }),
  examplePayload: getContactExamplePayload,
});
