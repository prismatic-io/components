import * as crypto from "node:crypto";
import { type TriggerPayload, util } from "@prismatic-io/spectral";
import type { GraphQLClient } from "graphql-request";
import createWebhookQuery from "../actions/graphql/queries/webhooks/CreateWebhook.gql";
import deleteWebhookQuery from "../actions/graphql/queries/webhooks/DeleteWebhook.gql";
import listWebhooksQuery from "../actions/graphql/queries/webhooks/ListWebhooks.gql";
import { MAX_LIMIT } from "../constants";
import type { PageInfo, Webhookinput, WebhookSubscription } from "../types";
import { fetchData } from "./pagination";

export const signaturesMatch = (
  expected: string,
  received: unknown,
): boolean => {
  if (typeof received !== "string") {
    return false;
  }
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");
  return (
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  );
};

export const performFunction = async (
  context,
  payload: TriggerPayload,
  { secret_key },
) => {
  if (secret_key) {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const SHOPIFY_HMAC = headers["x-shopify-hmac-sha256"];
    if (SHOPIFY_HMAC) {
      const requestBody = payload.rawBody.data;
      if (!context.isSimulatedTestExecution) {
        const signature = crypto
          .createHmac("sha256", secret_key)
          .update(requestBody as string, "utf8")
          .digest("base64");
        if (!signaturesMatch(signature, SHOPIFY_HMAC)) {
          throw new Error("Signature verification failed");
        }
      }
      return Promise.resolve({
        payload,
        response: {
          headers: {
            ...headers,
            "X-Shopify-Hmac-SHA256": SHOPIFY_HMAC,
          },
          statusCode: 200,
          contentType: "application/json",
          body: JSON.parse(util.types.toString(requestBody)),
        },
      });
    }
  }
  if (!context.isSimulatedTestExecution) {
    throw new Error("Signature verification failed");
  }
  return Promise.resolve({
    payload,
    response: {
      statusCode: 200,
      contentType: "application/json",
      body: "{}",
    },
  });
};

export const createWebhook = async (
  client: GraphQLClient,
  input: Webhookinput,
) => {
  const data: {
    webhookSubscriptionCreate: {
      webhookSubscription: WebhookSubscription;
      userErrors: Record<string, unknown>[];
    };
  } = await client.request(createWebhookQuery, input);
  return data;
};

export const deleteWebhookById = async (client: GraphQLClient, id: string) => {
  const data: { webhookSubscriptionDelete: Record<string, unknown> } =
    await client.request(deleteWebhookQuery, {
      id,
    });

  return data;
};

export const listWebhooks = async (
  client: GraphQLClient,
  getAlldata: boolean,
  limit: number,
  onlyInstanceWebhooks: boolean,
  instanceWebhookUrls: string[],
  endCursor: string | undefined,
  callbackUrl?: string,
) => {
  const shouldFetchAll = onlyInstanceWebhooks || getAlldata;

  const data = (await fetchData<WebhookSubscription>(
    client,
    ["webhookSubscriptions"],
    "webhookSubscriptions",
    shouldFetchAll,
    listWebhooksQuery,
    {
      first: shouldFetchAll ? MAX_LIMIT : limit,
      cursor: shouldFetchAll ? undefined : endCursor,
      callbackUrl,
    },
  )) as Record<"webhookSubscriptions", WebhookSubscription[]> & {
    pageInfo: PageInfo;
  };

  if (onlyInstanceWebhooks) {
    const webhooks = data.webhookSubscriptions;

    const filteredWebhooks = (webhooks || []).filter((webhook) =>
      instanceWebhookUrls.includes(webhook.endpoint.callbackUrl),
    );

    return {
      webhookSubscriptions: filteredWebhooks,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    };
  }

  return data;
};
