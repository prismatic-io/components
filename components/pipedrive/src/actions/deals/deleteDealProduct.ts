import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDealProductInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteDealProductExamplePayload } from "../../examplePayloads";
import { deleteDealProductOutputSchema } from "../../outputSchemas";

export const deleteDealProduct = action({
  display: {
    label: "Delete Deal Product",
    description: "Deletes an attached product from a deal.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, productAttachmentId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(
      `/deals/${id}/products/${productAttachmentId}`,
    );
    return { data };
  },
  inputs: deleteDealProductInputs,
  examplePayload: deleteDealProductExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDealProductOutputSchema,
  }),
});
