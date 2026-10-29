import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDealInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteDealExamplePayload } from "../../examplePayloads";
import { deleteDealOutputSchema } from "../../outputSchemas";

export const deleteDeal = action({
  display: {
    label: "Delete Deal",
    description: "Deletes a deal.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`/deals/${id}`);
    return { data };
  },
  inputs: deleteDealInputs,
  examplePayload: deleteDealExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDealOutputSchema,
  }),
});
