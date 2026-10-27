import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { reposDeleteWebhookExamplePayload } from "../../examplePayloads";
import { reposDeleteWebhookInputs } from "../../inputs";
export const reposDeleteWebhook = action({
  display: {
    label: "Delete Repository Webhook",
    description: "Delete a repository webhook by ID.",
  },
  examplePayload: reposDeleteWebhookExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${params.owner}/${params.repo}/hooks/${params.hookId}`,
    );
    return { data };
  },
  examplePerform: async () => reposDeleteWebhookExamplePayload,
  inputs: reposDeleteWebhookInputs,
});
