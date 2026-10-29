import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deletePersonExamplePayload } from "../../examplePayloads";
import { deletePersonOutputSchema } from "../../outputSchemas";

export const deletePerson = action({
  display: {
    label: "Delete Person",
    description: "Deletes a person.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`/persons/${id}`);
    return { data };
  },
  inputs: deletePersonInputs,
  examplePayload: deletePersonExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePersonOutputSchema,
  }),
});
