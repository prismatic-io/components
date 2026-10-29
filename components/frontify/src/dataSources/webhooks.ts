import { dataSource } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../client";
import { connection } from "../inputs/sharedInputs";
import type { WebhookItem, WebhooksResponse } from "../types";

const query = gql`
  query listWebhooks {
    webhooks {
      items {
        id
        name
      }
    }
  }
`;

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "A picklist of webhooks in the current account.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient({ connection, debug: false });
    const response: WebhooksResponse = await client.request(query);
    const items: WebhookItem[] = response?.webhooks?.items ?? [];
    return {
      result: items.map((item) => ({
        key: item.id,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "My Webhook", key: "eyJpZGVudGlmaWVyIjoiMSJ9" }],
  },
});
