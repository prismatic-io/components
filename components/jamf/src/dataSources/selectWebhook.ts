import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClassicClient } from "../client";
import { selectWebhookExamplePayload } from "../examplePayloads";
import { selectWebhookInputs } from "../inputs";
import type { WebhooksListResponse } from "../types";
import { mapToSortedElements } from "../util";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description:
      "Dynamically fetch a list of webhooks from Jamf Pro for use in a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectWebhookInputs,
  perform: async (_context, { connection }) => {
    const client = await createClassicClient(connection, false);
    const { data } = await client.get<WebhooksListResponse>("/webhooks");
    const result: Element[] = mapToSortedElements(data.webhooks, "id", "name");
    return { result };
  },
  examplePayload: selectWebhookExamplePayload,
});
