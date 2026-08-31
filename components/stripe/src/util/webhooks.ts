import type { ActionContext } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../client";
import type { CreatedWebhook } from "../types";
import { paginateStripeRecords } from "./pagination";
import { equalUnorderedArrays } from "./transform";
export const createWebhookFn = async (
  client: Stripe,
  webhookUrl: string,
  webhookEvents: string[],
) => {
  const data = await client.webhookEndpoints.create({
    url: webhookUrl,
    enabled_events:
      webhookEvents as Stripe.WebhookEndpointUpdateParams.EnabledEvent[],
    metadata: {},
  });
  return data;
};
export const updateWebhookEventsFn = async (
  client: Stripe,
  webhookId: string,
  webhookEvents: string[],
) => {
  const data = await client.webhookEndpoints.update(webhookId, {
    enabled_events:
      webhookEvents as Stripe.WebhookEndpointUpdateParams.EnabledEvent[],
  });
  return data;
};
export const deleteWebhookFn = async (client: Stripe, webhookId: string) => {
  const data = await client.webhookEndpoints.del(webhookId);
  return data;
};
export const deleteWebhookEventsFn = async (
  client: Stripe,
  webhookIds: string[],
) => {
  const data = await Promise.all(
    webhookIds.map((id) => deleteWebhookFn(client, id)),
  );
  return data;
};
export const listWebhookEventsFn = async (
  client: Stripe.WebhookEndpointsResource,
  fetchAll: boolean,
  params: Record<string, unknown>,
) => {
  const data = (await paginateStripeRecords(
    client,
    fetchAll,
    params,
  )) as Stripe.ApiList<Stripe.WebhookEndpoint>;
  return data;
};
export const onInstanceDeploy = async (
  context: ActionContext,
  { connection, webhookEvents },
) => {
  const client = createStripeClient({
    stripeConnection: connection,
    timeout: 5000,
  });
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const previousCrossFlowState = context.crossFlowState[flowName] as Record<
    string,
    unknown
  >;
  const existingWebhook = await findWebhookForUrl(
    client.webhookEndpoints,
    webhookUrl,
  );
  if (!existingWebhook) {
    const createdWebhook = await createWebhookFn(
      client,
      webhookUrl,
      webhookEvents as string[],
    );
    context.crossFlowState[flowName] = {
      ...previousCrossFlowState,
      webhook: createdWebhook,
    };
    return;
  }
  if (equalUnorderedArrays(existingWebhook.enabled_events, webhookEvents)) {
    return;
  }
  const updatedWebhook = await updateWebhookEventsFn(
    client,
    existingWebhook.id,
    webhookEvents as string[],
  );
  const previousSecret = (
    previousCrossFlowState?.webhook as CreatedWebhook["webhook"] | undefined
  )?.secret;
  context.crossFlowState[flowName] = {
    ...previousCrossFlowState,
    webhook: {
      ...updatedWebhook,
      secret: updatedWebhook.secret ?? previousSecret,
    },
  };
  return;
};
export const onInstanceDelete = async (
  context: ActionContext,
  { connection },
) => {
  const client = createStripeClient({
    stripeConnection: connection,
    timeout: 5000,
  });
  const webhookUrl = context.webhookUrls[context.flow.name];
  const { data } = await listWebhookEventsFn(client.webhookEndpoints, true, {});
  const webhookToDelete = data
    .filter(({ url }) => url === webhookUrl)
    .map(({ id }) => deleteWebhookFn(client, id));
  await Promise.all(webhookToDelete);
  const previousStore = context.crossFlowState[
    context.flow.name
  ] as CreatedWebhook;
  context.crossFlowState[context.flow.name] = {
    ...previousStore,
    webhook: undefined,
  };
  return;
};
export const validateTrigger = (
  client: Stripe,
  body: string,
  sig: string,
  webhookSecret: string,
) => {
  try {
    client.webhooks.constructEvent(body, sig, webhookSecret);
    return true;
  } catch (err) {
    throw new Error(`Webhook Error ${(err as Error).message}`);
  }
};
export const getStripeHeaderSignature = (
  headers: Record<string, string>,
): string => {
  if (headers) {
    const stripeSignature = headers["stripe-signature"];
    if (!stripeSignature) {
      throw new Error("Missing Stripe-Signature header");
    }
    return stripeSignature;
  }
  throw new Error("Missing headers");
};
export const findWebhookForUrl = async (
  client: Stripe.WebhookEndpointsResource,
  webhookUrl: string,
) => {
  const { data } = await listWebhookEventsFn(client, true, {});
  return data.find((webhook) => webhook.url === webhookUrl);
};
