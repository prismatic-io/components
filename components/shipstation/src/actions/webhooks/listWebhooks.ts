import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieves a list of registered webhooks for the account.",
  },
  perform: async (context, { connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get("/webhooks");
    return { data };
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
});
