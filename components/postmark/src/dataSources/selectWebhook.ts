import { dataSource } from "@prismatic-io/spectral";
import type { Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { connectionInput } from "../inputs";
import { selectWebhookExamplePayload as examplePayload } from "../examplePayloads/dataSources";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook from a list of webhooks.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createHttpClient(connection, false);
    const { data } = await client.get("/webhooks");

    const webhooks = data?.Webhooks ?? [];

    const result: Element[] = webhooks
      .map((item: { Url?: string; ID?: number }) => ({
        label: item.Url || String(item.ID) || "",
        key: String(item.ID || ""),
      }))
      .sort((a: Element, b: Element) =>
        (a.label || "").localeCompare(b.label || ""),
      );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
