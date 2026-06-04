import { URL } from "node:url";
import { dataSource, util, type Element } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "./client";
import { connectionInput } from "./inputs";
import { API_VERSION, BASE_URL } from "./constants";

interface SendGridWebhook {
  id: string;
  friendly_name?: string;
  url?: string;
  enabled?: boolean;
}

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select an event webhook from your SendGrid account.",
  },
  inputs: { connection: connectionInput },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createAuthorizedClient(connection);

    try {
      const [_response, body] = await client.request({
        method: "GET",
        url: "/v3/user/webhooks/event/settings/all",
      });

      const typedBody = body as { webhooks?: SendGridWebhook[] };
      const webhooks = typedBody?.webhooks || [];

      const result = webhooks.map<Element>((webhook) => ({
        label: webhook.friendly_name || webhook.url || webhook.id,
        key: webhook.id,
      }));

      return { result };
    } catch (error) {
      context.logger.error(
        `Failed to fetch SendGrid webhooks for data source: ${util.types.toString(error)}`,
      );
      return {
        result: [
          {
            label: "Error fetching webhooks. Check logs.",
            key: "ERROR",
          },
        ],
      };
    }
  },
  examplePayload: {
    result: [
      {
        label: "Engagement Webhook",
        key: "77d4a5da-7015-11ed-a1eb-0242ac120002",
      },
    ],
  },
});

interface SendGridList {
  id: string;
  name: string;
  contact_count: number;
  _metadata: {
    self: string;
  };
}

interface GetAllListsResponseBody {
  result: SendGridList[];
  _metadata?: {
    self: string;
    next?: string;
    prev?: string;
    count?: number;
  };
}

export const sendGridListsDataSource = dataSource({
  display: {
    label: "SendGrid Contact Lists",
    description: "Fetch a picklist of contact lists from SendGrid",
  },
  inputs: { connection: connectionInput },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createAuthorizedClient(connection);
    const allLists: Element[] = [];
    let nextPath = `/${API_VERSION}/marketing/lists?page_size=100`;

    try {
      while (nextPath) {
        
        const url = new URL(
          nextPath.startsWith("http") ? nextPath : `${BASE_URL}${nextPath}`,
        );
        const path = url.pathname;
        const queryParams = Object.fromEntries(url.searchParams);

        const [_response, body] = await client.request({
          method: "GET",
          url: path,
          qs: queryParams,
        });

        const typedBody = body as GetAllListsResponseBody;

        if (typedBody?.result) {
          const lists = typedBody.result.map<Element>((list) => ({
            label: `${list.name} (${list.contact_count} contacts)`,
            key: list.id,
          }));
          allLists.push(...lists);
        }

        
        nextPath = typedBody?._metadata?.next || "";
      }
      return { result: allLists };
    } catch (error) {
      context.logger.error(
        `Failed to fetch SendGrid lists for data source: ${util.types.toString(
          error,
        )}`,
      );
      return {
        result: [
          {
            label: "Error fetching lists. Check logs.",
            key: "ERROR",
          },
        ],
      };
    }
  },
  examplePayload: {
    result: [
      { label: "Summer Newsletter (1020 contacts)", key: "abc-123" },
      { label: "Product Updates (50 contacts)", key: "def-456" },
    ],
  },
});
