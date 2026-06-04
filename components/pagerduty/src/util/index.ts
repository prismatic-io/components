import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { ENDPOINTS } from "../constants";

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const toOptionalBoolean = (value: unknown): boolean | undefined =>
  value ? util.types.toBool(value) : undefined;

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.map((item) => util.types.toString(item)) : [];

export const toRequiredStringList = (value: unknown) => {
  const array = value as unknown[];

  return array.map((item) => util.types.toString(item));
};

export const deleteInstanceWebhooks = async (
  client: HttpClient,
  webhookUrls: Record<string, string>,
) => {
  const instanceWebhookUrls = Object.values(webhookUrls);
  const {
    data: { webhook_subscriptions },
  } = await client.get(ENDPOINTS.WEBHOOK_SUBSCRIPTIONS);

  for await (const webhook of webhook_subscriptions) {
    if (instanceWebhookUrls.includes(webhook.delivery_method.url)) {
      await client.delete(ENDPOINTS.WEBHOOK_SUBSCRIPTIONS_BY_ID(webhook.id));
    }
  }

  return;
};
