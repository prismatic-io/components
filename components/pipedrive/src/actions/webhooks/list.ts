import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooks as listWebhooksFn } from "../../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhooks.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await listWebhooksFn(client);
    return { data };
  },
  inputs: listWebhooksInputs,
});
