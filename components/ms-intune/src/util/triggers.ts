import {
  type ActionContext,
  type ConfigVarResultCollection,
  type TriggerBranchingResult,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import {
  ENDPOINTS,
  MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
  MISSING_CHANGE_TYPE_MESSAGE,
  MS_PER_MINUTE,
  TriggerBranches,
} from "../constants";
import type { GraphResponseData, Subscription } from "../types";
import { paginateResults } from "./pagination";

export const triggerPerformFunction = async (
  _context: ActionContext<ConfigVarResultCollection>,
  payload: TriggerPayload,
): Promise<TriggerBranchingResult<TriggerPayload>> => {
  const rawValidationToken = payload.queryParameters?.validationToken;
  const validationToken = util.types.toString(rawValidationToken);
  if (validationToken)
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "text/plain",
        body: validationToken,
      },
      branch: TriggerBranches.URLValidation,
    });

  return Promise.resolve({
    payload,
    branch: TriggerBranches.Notification,
  });
};

const splitChangeTypes = (changeType: unknown): string[] =>
  util.types
    .toString(changeType)
    .split(",")
    .map((value) => value.trim());

export const subscribeToResource = async (
  client: HttpClient,
  endpoint: string,
  resource: string,
  changeTypes: string[] | undefined,
  expirationDateTime: string,
  extraParams: Record<string, unknown> = {},
): Promise<GraphResponseData[]> => {
  if (!changeTypes?.length) {
    throw new Error(MISSING_CHANGE_TYPE_MESSAGE);
  }
  const promises = [];
  const data = await paginateResults(client, ENDPOINTS.SUBSCRIPTIONS, true, {});
  for (const type of changeTypes) {
    const existingSubscription = (data.value as Subscription[]).find(
      ({ notificationUrl, changeType }) =>
        notificationUrl === endpoint &&
        splitChangeTypes(changeType).includes(type),
    );

    if (existingSubscription)
      throw new Error(
        `Subscription of type ${type} already exists for this endpoint.`,
      );

    const payload = {
      changeType: type,
      notificationUrl: endpoint,
      resource,
      expirationDateTime,
      ...extraParams,
    };
    promises.push(client.post(ENDPOINTS.SUBSCRIPTIONS, payload));
  }
  const createdSubscriptions = await Promise.all(promises);
  return createdSubscriptions.map(({ data }) => data);
};

const addMinutesToDate = (currentDate: Date, minutesToAdd: number): string => {
  const futureDate = new Date(
    currentDate.getTime() + minutesToAdd * MS_PER_MINUTE,
  );
  const formattedDate = futureDate
    .toISOString()
    .replace("Z", "Z")
    .replace(/\.\d{3}Z$/, (match) => {
      const milliseconds = `${match.slice(1, 4)}0000`;
      return `.${milliseconds}Z`;
    });

  return formattedDate;
};

export const removeSubscriptions = async (
  client: HttpClient,
  instanceWebhooks: Set<string>,
): Promise<{ subscriptionsRemoved: string[] }> => {
  const data = await paginateResults(client, ENDPOINTS.SUBSCRIPTIONS, true, {});

  const subscriptionsToRemove: string[] = (data.value as Subscription[])
    .filter(({ notificationUrl }) => instanceWebhooks.has(notificationUrl))
    .map(({ id }) => id);

  await Promise.all(
    subscriptionsToRemove.map((id) =>
      client.delete(`${ENDPOINTS.SUBSCRIPTIONS}/${id}`),
    ),
  );

  return { subscriptionsRemoved: subscriptionsToRemove };
};

export const getExpirationDate = (
  expirationDateTime: string | undefined,
): string => {
  return expirationDateTime
    ? expirationDateTime
    : addMinutesToDate(
        new Date(),
        MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
      );
};
