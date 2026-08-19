import crypto from "node:crypto";
import type { URLSearchParams } from "node:url";
import {
  type ActionContext,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import type {
  ClientProps,
  HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { hubspotOAuth, hubspotOAuthTrigger } from "../connections";
import type { Engagement } from "../types/Engagement";
import type { GetSubscriptionPayload } from "../types/GetSubscriptionPayload";
import type { Paging } from "../types/Paging";
import type {
  PollingChangesObject,
  PollingRecordChange,
} from "../types/PollingTriggerObject";
import type { WebhookSettings } from "../types/WebhookSettings";
export * from "./polling";
export const toStringList = (array: unknown[]) => {
  return array.map((item) => util.types.toString(item));
};
export const getProps = (baseProps: unknown[], additionalProps: unknown[]) => {
  const properties = toStringList([
    ...new Set([...baseProps, ...(additionalProps || [])]),
  ]).join(",");
  return {
    properties,
  };
};
export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};
export const getDynamicValues = (dynamicValues: unknown) => {
  let dynamicValuesToUse = dynamicValues;
  if (dynamicValuesToUse) {
    if (typeof dynamicValuesToUse === "string")
      try {
        dynamicValuesToUse = JSON.parse(dynamicValuesToUse);
      } catch (_e) {
        throw new Error("Dynamic Fields should be a valid JSON string");
      }
    if (!Array.isArray(dynamicValuesToUse))
      throw new Error("Dynamic Fields should be an array");
    for (const pair of dynamicValuesToUse) {
      if (!("key" in pair) || !("value" in pair))
        throw new Error(
          "Each item in Dynamic Fields should be a key-value pair",
        );
    }
    return util.types.keyValPairListToObject(dynamicValuesToUse);
  }
  return {};
};
export const getAllPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  returnOnlyResults = true,
  config?: ClientProps,
) => {
  const finalObject: {
    results: T[];
    paging: Paging;
  } = {
    results: [],
    paging: null,
  };
  let nextUrl = url;
  let nextConfig = config;
  do {
    const { data } = await client.get(nextUrl, nextConfig);
    finalObject.paging = data.paging;
    finalObject.results = finalObject.results.concat(data.results);
    if (finalObject.paging?.next) {
      nextUrl = data.paging.next.link;
      nextConfig = undefined;
    }
    if (!fetchAll) break;
  } while (finalObject.paging?.next);
  return returnOnlyResults ? finalObject.results : finalObject;
};
export const addUrlSearchParamsFromStringArray = (
  searchParams: URLSearchParams,
  array: string[],
  attributeName: string,
): URLSearchParams => {
  for (const item of array) {
    searchParams.append(attributeName, item);
  }
  return searchParams;
};
export const getArrayOfObjectsWithKey = (
  array: string[],
  key: string,
): Record<string, string>[] => array.map((item) => ({ [key]: item }));
export const checkDeveloperApiKeyAndAppId = (
  hubspotConnection: Connection,
): {
  developerApiKey: string;
  appId: string;
} => {
  const developerApiKey = util.types.toString(
    hubspotConnection.fields.developerApiKey,
  );
  const appId = util.types.toString(hubspotConnection.fields.appId);
  if (!appId || !developerApiKey) {
    throw new Error(
      "An App ID and a Developer API Key are required for webhook functionality. Make sure to add them in the Connection settings.",
    );
  }
  return { developerApiKey, appId };
};
export const appWebhookSettingsExists = async (
  client: HttpClient,
  appId: string,
  developerApiKey: string,
  returnSettingsWhenExists = false,
): Promise<WebhookSettings | boolean> => {
  try {
    const { data } = await client.get<WebhookSettings>(
      `/webhooks/v3/${appId}/settings`,
      {
        params: { hapikey: developerApiKey },
      },
    );
    return returnSettingsWhenExists ? data : true;
  } catch (error) {
    if (
      (
        error as {
          response: {
            status: number;
          };
        }
      ).response?.status
    ) {
      const status = (
        error as {
          response: {
            status: number;
          };
        }
      ).response.status;
      if (status === 404) {
        return false;
      }
      throw error;
    }
    throw error;
  }
};
export const appWebhookSubscriptionsExists = async (
  client: HttpClient,
  appId: string,
  developerApiKey: string,
) => {
  const {
    data: { results: allSubscriptions },
  } = await client.get<GetSubscriptionPayload>(
    `/webhooks/v3/${appId}/subscriptions`,
    {
      params: { hapikey: developerApiKey },
    },
  );
  return allSubscriptions.length > 0;
};
export const deleteAllAppSubscriptions = async (
  client: HttpClient,
  appId: string,
  developerApiKey: string,
): Promise<void> => {
  const queryParams = {
    hapikey: developerApiKey,
  };
  const { data } = await client.get<GetSubscriptionPayload>(
    `/webhooks/v3/${appId}/subscriptions`,
    {
      params: queryParams,
    },
  );
  const deleteSubscriptionPromises = data.results.map(({ id }) =>
    client.delete(`/webhooks/v3/${appId}/subscriptions/${id}`, {
      params: queryParams,
    }),
  );
  await Promise.all(deleteSubscriptionPromises);
};
export const deleteAppSettings = async (
  client: HttpClient,
  appId: string,
  developerApiKey: string,
): Promise<void> => {
  const queryParams = {
    hapikey: developerApiKey,
  };
  await client.delete(`/webhooks/v3/${appId}/settings`, {
    params: queryParams,
  });
};
export const createAppWebhookConfiguration = async (
  client: HttpClient,
  eventTypes: string[],
  appId: string,
  developerApiKey: string,
  webhookUrl: string,
): Promise<void> => {
  await deleteAllAppSubscriptions(client, appId, developerApiKey);
  await deleteAppSettings(client, appId, developerApiKey);
  await client.put<WebhookSettings>(
    `/webhooks/v3/${appId}/settings`,
    {
      targetUrl: webhookUrl,
      throttling: {
        period: "ROLLING_MINUTE",
        maxConcurrentRequest: 10,
      },
    },
    {
      params: {
        hapikey: developerApiKey,
      },
    },
  );
  await Promise.all(
    eventTypes.map((eventType) =>
      client.post(
        `/webhooks/v3/${appId}/subscriptions`,
        { active: true, eventType },
        {
          params: {
            hapikey: developerApiKey,
          },
        },
      ),
    ),
  );
};
const validateWebhook = (
  context: ActionContext,
  payload,
  clientSecret: string,
) => {
  const headers = util.types.lowerCaseHeaders(payload.headers);
  const {
    "x-hubspot-signature-v3": signature,
    "x-hubspot-request-timestamp": timestamp,
  } = headers;
  const requestBody = payload.rawBody.data.toString();
  if (!context.isSimulatedTestExecution) {
    const hash = crypto
      .createHmac("sha256", clientSecret)
      .update(`POST${context.invokeUrl}${requestBody}${timestamp}`)
      .digest("base64");
    if (signature !== hash) {
      throw new Error(
        "Invalid signature check, request does not come from HubSpot",
      );
    }
  }
  return Promise.resolve({
    payload,
  });
};
export const webhookPerformFunction = async (
  context: ActionContext,
  payload,
  inputs: {
    hubspotConnection: Connection;
  },
) => {
  if (![hubspotOAuth.key].includes(inputs.hubspotConnection.key)) {
    throw new ConnectionError(
      inputs.hubspotConnection,
      `${hubspotOAuth.display.label} connection is required for this action.`,
    );
  }
  const clientSecret = getClientSecret(inputs.hubspotConnection);
  return validateWebhook(context, payload, clientSecret);
};
export const triggerWebhookPerformFunction = async (
  context: ActionContext,
  payload,
  inputs: {
    hubspotConnection: Connection;
  },
) => {
  if (![hubspotOAuthTrigger.key].includes(inputs.hubspotConnection.key)) {
    throw new ConnectionError(
      inputs.hubspotConnection,
      `Only the ${hubspotOAuthTrigger.display.label} connection can be used for this trigger.`,
    );
  }
  const clientSecret = getClientSecret(inputs.hubspotConnection);
  return validateWebhook(context, payload, clientSecret);
};
export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
export const resolvePollingRecordChanges = (
  data: Partial<PollingChangesObject> | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.createdRecords ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updatedRecords ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const getEngagementObjectLabel = (
  properties: Engagement["properties"],
): string => {
  const engagementObjectProperties = [
    "hs_task_subject",
    "hs_postal_mail_body",
    "hs_note_body",
    "hs_meeting_title",
    "hs_call_body",
    "hs_call_title",
    "hs_email_subject",
    "hs_communication_body",
  ];
  for (const property of Object.keys(properties)) {
    if (engagementObjectProperties.includes(property)) {
      return properties[property];
    }
  }
  return `Engagement ${properties.hs_object_id}`;
};
export const getClientSecret = (connection: Connection): string => {
  return util.types.toString(connection.fields.clientSecret);
};
