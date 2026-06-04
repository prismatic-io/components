import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ActionContext } from "@prismatic-io/spectral/dist/serverTypes";
import type {
  CreateSubscriptionData,
  GraphSubscription,
  PaginatedResponse,
  SubscriptionDeletion,
} from "../interfaces/Subscriptions";
import type { ScheduledRenewalResult } from "../interfaces/WebhookPerform";
import {
  DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES,
  MAX_SUBSCRIPTION_EXPIRATION_MINUTES,
} from "../subscriptions/constants";

export const calculateExpirationDateTime = (
  minutes: number = DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES,
): string => {
  const cappedMinutes = Math.min(minutes, MAX_SUBSCRIPTION_EXPIRATION_MINUTES);
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + cappedMinutes * 60 * 1000);
  return expirationDate.toISOString();
};

export const listAllSubscriptionsFN = async (
  client: HttpClient,
): Promise<GraphSubscription[]> => {
  const data = await fetchAllData<GraphSubscription>(
    client,
    "/subscriptions",
    true,
    {},
  );
  return data.value || [];
};

export const getSubscriptionByIdFN = async (
  client: HttpClient,
  subscriptionId: string,
): Promise<GraphSubscription> => {
  const { data } = await client.get<GraphSubscription>(
    `/subscriptions/${subscriptionId}`,
  );
  return data;
};

export const deleteSubscriptionByIdFN = async (
  client: HttpClient,
  subscriptionId: string,
): Promise<SubscriptionDeletion> => {
  await client.delete(`/subscriptions/${subscriptionId}`);
  return { id: subscriptionId, deleted: true };
};

export const deleteAllSubscriptionsFN = async (
  client: HttpClient,
  notificationUrl?: string,
): Promise<SubscriptionDeletion[]> => {
  const subscriptions = await listAllSubscriptionsFN(client);
  const deletedSubscriptions: SubscriptionDeletion[] = [];

  await Promise.all(
    subscriptions.map(async (subscription) => {
      if (
        subscription.id &&
        (!notificationUrl || subscription.notificationUrl === notificationUrl)
      ) {
        const deleted = await deleteSubscriptionByIdFN(client, subscription.id);
        deletedSubscriptions.push(deleted);
      }
    }),
  );

  return deletedSubscriptions;
};

export const createSubscriptionFN = async (
  client: HttpClient,
  {
    resource,
    changeType,
    notificationUrl,
    expirationDateTime,
    allowDuplicates,
    clientState,
    customBody,
  }: CreateSubscriptionData,
  context: ActionContext,
): Promise<GraphSubscription> => {
  if (!allowDuplicates) {
    const subscriptions = await listAllSubscriptionsFN(client);
    const [existingSubscription] = subscriptions.filter(
      ({ notificationUrl: existingNotificationUrl }) =>
        existingNotificationUrl === notificationUrl,
    );
    if (existingSubscription) {
      context.logger.info(
        "A Subscription with the specified Notification URL already exists. Skipping Subscription creation and returning existing Subscription.",
      );
      return existingSubscription;
    }
  }
  const { data } = await client.post("/subscriptions", {
    changeType,
    notificationUrl,
    resource,
    expirationDateTime,
    clientState,
    ...(customBody || {}),
  });
  return data;
};

export const renewSubscriptionFN = async (
  client: HttpClient,
  subscriptionId: string,
  expirationMinutes: number = DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES,
): Promise<GraphSubscription> => {
  const expirationDateTime = calculateExpirationDateTime(expirationMinutes);

  const { data } = await client.patch<GraphSubscription>(
    `/subscriptions/${subscriptionId}`,
    { expirationDateTime },
  );

  return data;
};

export const updateSubscriptionUrlFN = async (
  client: HttpClient,
  subscriptionId: string,
  notificationUrl: string,
): Promise<GraphSubscription> => {
  const { data } = await client.patch<GraphSubscription>(
    `/subscriptions/${subscriptionId}`,
    { notificationUrl },
  );

  return data;
};

export const fetchAllData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
): Promise<PaginatedResponse<T>> => {
  const results: T[] = [];
  let nextLink: string | undefined;
  let firstResponse: PaginatedResponse<T> | undefined;

  do {
    const { data } = await client.get<PaginatedResponse<T>>(
      nextLink || url,
      nextLink
        ? undefined
        : {
            params: fetchAll
              ? Object.fromEntries(
                  Object.entries(params).filter(
                    ([key]) => !["$top", "$skip"].includes(key),
                  ),
                )
              : params,
          },
    );

    if (!firstResponse) {
      firstResponse = data;
    }

    results.push(...data.value);
    nextLink = data["@odata.nextLink"];

    if (!fetchAll) {
      break;
    }
  } while (nextLink);

  if (!firstResponse) {
    throw new Error("No response received from the API");
  }

  const response = {
    "@odata.context": firstResponse["@odata.context"],
    value: results,
  };

  if (fetchAll) {
    return response;
  }

  if (firstResponse["@odata.nextLink"]) {
    return {
      ...response,
      "@odata.nextLink": firstResponse["@odata.nextLink"],
    };
  }

  return response;
};

export const cleanExpirationDateTime = (input: unknown): string => {
  if (input) {
    const date = util.types.toDate(input);
    if (Number.isNaN(date.getTime())) {
      throw new Error("Invalid date format for expiration date/time.");
    }
    return date.toISOString();
  }
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() +
      DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES * 60 * 1000,
  );
  return expirationDate.toISOString();
};

export const renewAllSubscriptionsByUrlFN = async (
  client: HttpClient,
  notificationUrl: string,
  expirationMinutes: number = DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES,
): Promise<GraphSubscription[]> => {
  const subscriptions = await listAllSubscriptionsFN(client);
  const matchingSubscriptions = subscriptions.filter(
    (sub) => sub.notificationUrl === notificationUrl,
  );

  const renewedSubscriptions: GraphSubscription[] = [];

  await Promise.all(
    matchingSubscriptions.map(async (subscription) => {
      if (subscription.id) {
        const renewed = await renewSubscriptionFN(
          client,
          subscription.id,
          expirationMinutes,
        );
        renewedSubscriptions.push(renewed);
      }
    }),
  );

  return renewedSubscriptions;
};

export const scheduledRenewalFN = async (
  client: HttpClient,
  storedSubscriptionId: string | undefined,
  webhookUrl: string,
  expirationMinutes: number = DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES,
): Promise<ScheduledRenewalResult> => {
  let newSubscriptionId: string | undefined;
  let usedUrlFallback = !storedSubscriptionId;
  let renewedCount = 0;

  if (storedSubscriptionId) {
    try {
      await renewSubscriptionFN(
        client,
        storedSubscriptionId,
        expirationMinutes,
      );
      renewedCount = 1;
    } catch {
      usedUrlFallback = true;
    }
  }

  if (usedUrlFallback) {
    const renewedSubscriptions = await renewAllSubscriptionsByUrlFN(
      client,
      webhookUrl,
      expirationMinutes,
    );
    renewedCount = renewedSubscriptions.length;

    if (renewedSubscriptions.length > 0 && renewedSubscriptions[0].id) {
      newSubscriptionId = renewedSubscriptions[0].id;
    }
  }

  return {
    newSubscriptionId,
    usedUrlFallback,
    renewedCount,
  };
};
