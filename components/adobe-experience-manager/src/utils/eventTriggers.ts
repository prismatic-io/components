import type {
  ActionContext,
  Connection,
  TriggerPayload,
  TriggerResult,
} from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import {
  createIoEventsClient,
  createPublicClient,
  isIoEventsConnection,
} from "../client";
import type { AemEventLifecycleHandlers } from "../types";
import { parseAemCloudEvent, toAemEventItem } from "./events";
import { verifyAdobeSignature } from "./signature";
import {
  deleteRegistrationsForUrl,
  ensureRegistration,
  getWebhookUrl,
  webhookStateKey,
} from "./webhooks";

export const aemEventLifecycleHandlers = (
  label: string,
): AemEventLifecycleHandlers => ({
  create: async (context, params) => {
    if (!isIoEventsConnection(params.connection)) {
      throw new Error(
        `${label} requires the OAuth 2.0 Client Credentials connection. Adobe I/O Events registrations are documented for OAuth Server-to-Server credentials only.`,
      );
    }
    if (!params.eventTypes.length) {
      throw new Error(
        `${label} needs at least one event type. Select the events to subscribe to in Event Types.`,
      );
    }
    const client = createIoEventsClient(
      params.connection,
      context.debug.enabled,
    );
    const state = await ensureRegistration(context, client, params);
    return state
      ? { crossFlowState: { [webhookStateKey(context)]: state } }
      : undefined;
  },
  delete: async (context, params) => {
    if (!isIoEventsConnection(params.connection)) {
      return { crossFlowState: { [webhookStateKey(context)]: null } };
    }
    const client = createIoEventsClient(
      params.connection,
      context.debug.enabled,
    );
    await deleteRegistrationsForUrl(client, params, getWebhookUrl(context));
    return { crossFlowState: { [webhookStateKey(context)]: null } };
  },
});

export const performAemEvent = async (
  context: ActionContext & { isSimulatedTestExecution?: boolean },
  payload: TriggerPayload,
  params: {
    connection: Connection;
    workspaceId: string;
    publishBaseUrl?: string;
  },
): Promise<TriggerResult<true, TriggerPayload>> => {
  const challenge = payload.queryParameters?.challenge;
  if (challenge) {
    return {
      payload: { ...payload, body: { data: null } },
      branch: "URL Verification",
      response: { statusCode: 200, contentType: "text/plain", body: challenge },
    };
  }

  const rawBody = util.types.toString(payload.rawBody.data);
  const event = parseAemCloudEvent(payload.body.data, rawBody);
  if (!context.isSimulatedTestExecution) {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    await verifyAdobeSignature(
      createPublicClient(context.debug.enabled),
      headers,
      rawBody,
    );
    const clientId = util.types.toString(params.connection.fields.clientId);
    if (event.recipientclientid && event.recipientclientid !== clientId) {
      throw new Error(
        "AEM event was addressed to a different Adobe client ID.",
      );
    }
  }

  const item = toAemEventItem(event, params.workspaceId, params.publishBaseUrl);
  return {
    payload: { ...payload, body: { data: item } },
    branch: "Notification",
  };
};
