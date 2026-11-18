import {
  type ActionContext,
  type ConfigVarResultCollection,
  type TriggerPayload,
  type TriggerResult,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import { TriggerBranches } from "../constants";
import type { Subscription } from "../types";
import { getValues } from "./pagination";

export const triggerPerformFunction = async (
  _context: ActionContext<ConfigVarResultCollection>,
  payload: TriggerPayload,
): Promise<TriggerResult<true, TriggerPayload>> => {
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

export const addMinutesToDate = (
  currentDate: Date,
  minutesToAdd: number,
): string => {
  const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60 * 1000);
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
  const {
    data: { value: subscriptions },
  } = await getValues(true, client, `/subscriptions`, {});

  const subscriptionsToRemove: string[] = (subscriptions as Subscription[])
    .filter(({ notificationUrl }) => instanceWebhooks.has(notificationUrl))
    .map(({ id }) => id);

  await Promise.all(
    subscriptionsToRemove.map((id) => client.delete(`/subscriptions/${id}`)),
  );

  return { subscriptionsRemoved: subscriptionsToRemove };
};
