import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { connectionInput, validateId } from "../../inputs";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete an existing webhook by ID.",
  },
  inputs: {
    asanaConnection: connectionInput,
    webhookId: {
      label: "Webhook ID",
      type: "string",
      example: "375893453",
      comments: "The gid of the workspace",
      required: true,
      clean: validateId,
    },
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/webhooks/${params.webhookId}`);
    return { data };
  },
  examplePayload: { data: {} },
});
