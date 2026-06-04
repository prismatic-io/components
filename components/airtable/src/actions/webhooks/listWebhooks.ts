import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { getBaseId } from "../../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhook subscriptions registered for a base.",
  },
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const baseId = getBaseId(params.airtableConnection, params.baseId);

    const { data } = await client.get(`/v0/bases/${baseId}/webhooks`);

    return { data: data.webhooks };
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
});
