import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection } from "../inputs";
import { getWebhooks } from "../utils";
import { listWebhooksPayload } from "../examplePayloads";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieve all webhooks.",
  },
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const data = await getWebhooks(client);
    return { data };
  },
  inputs: {
    connection,
  },
  examplePayload: listWebhooksPayload,
});
