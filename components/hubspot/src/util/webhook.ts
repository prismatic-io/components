import crypto from "node:crypto";
import {
  type ActionContext,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { hubspotOAuth, hubspotOAuthTrigger } from "../connections";
import type { GetSubscriptionPayload, WebhookSettings } from "../types";
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
export const buildSubscriptionPayloads = (
  eventTypes: string[],
  propertyChangeProperties: Record<string, unknown> = {},
): {
  active: boolean;
  eventType: string;
  propertyName?: string;
}[] => {
  const payloads: {
    active: boolean;
    eventType: string;
    propertyName?: string;
  }[] = [];
  for (const eventType of eventTypes) {
    if (eventType.endsWith(".propertyChange")) {
      const propertyCsv = propertyChangeProperties[eventType] as
        | string
        | undefined;
      if (!propertyCsv) {
        throw new Error(
          `Event type "${eventType}" requires at least one property name in the Property Change Properties input.`,
        );
      }
      const propertyNames = propertyCsv
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      if (propertyNames.length === 0) {
        throw new Error(
          `Event type "${eventType}" requires at least one property name in the Property Change Properties input.`,
        );
      }
      for (const propertyName of propertyNames) {
        payloads.push({ active: true, eventType, propertyName });
      }
    } else {
      payloads.push({ active: true, eventType });
    }
  }
  return payloads;
};
export const createAppWebhookConfiguration = async (
  client: HttpClient,
  eventTypes: string[],
  appId: string,
  developerApiKey: string,
  webhookUrl: string,
  propertyChangeProperties: Record<string, unknown> = {},
): Promise<void> => {
  const subscriptions = buildSubscriptionPayloads(
    eventTypes,
    propertyChangeProperties,
  );
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
    subscriptions.map((subscription) =>
      client.post(`/webhooks/v3/${appId}/subscriptions`, subscription, {
        params: {
          hapikey: developerApiKey,
        },
      }),
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
export const getClientSecret = (connection: Connection): string => {
  return util.types.toString(connection.fields.clientSecret);
};
