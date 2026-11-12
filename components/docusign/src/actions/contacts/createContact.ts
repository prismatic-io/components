import { action, outputSchema } from "@prismatic-io/spectral";
import { createContactOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { createContactInputs } from "../../inputs";
import { createContactExamplePayload } from "../../examplePayloads";

export const createContact = action({
  display: {
    label: "Create Contact",
    description: "This method adds multiple contacts into a contacts list.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/contacts`, jsonInput);
    return { data };
  },
  examplePerform: async () => createContactExamplePayload,
  inputs: createContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createContactOutputSchema,
  }),
  examplePayload: createContactExamplePayload,
});
