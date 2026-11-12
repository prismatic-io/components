import { action, outputSchema } from "@prismatic-io/spectral";
import { updateContactOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateContactInputs } from "../../inputs";
import { updateContactExamplePayload } from "../../examplePayloads";

export const updateContact = action({
  display: {
    label: "Update Contact",
    description:
      "This method updates one or more contacts associated with an account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/contacts`, jsonInput);
    return { data };
  },
  examplePerform: async () => updateContactExamplePayload,
  inputs: updateContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateContactOutputSchema,
  }),
  examplePayload: updateContactExamplePayload,
});
