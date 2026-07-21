import { action } from "@prismatic-io/spectral";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieve a list of all the webhooks on the specified site.",
  },
  examplePayload: listWebhooksExamplePayload,
  perform: async (context, { apiVersion, tableauConnection, timeout }) => {
    const client = await getTableauClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const { data } = await client.get("/webhooks");
    return {
      data,
    };
  },
  inputs: listWebhooksInputs,
});
