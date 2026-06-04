import { trigger } from "@prismatic-io/spectral";
import { pipedriveTriggerExamplePayload } from "../examplePayloads/triggers";
import {
  connectionInput,
  eventAction,
  eventObject,
  httpAuthPassword,
  httpAuthUser,
  webhookVersion,
  webhookUserId,
} from "../inputs";
import { onInstanceDelete, onInstanceDeploy, validateConnection } from "../util";

export const pipedriveTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive event notifications from Pipedrive. Automatically creates and manages a webhook subscription for the selected event action and object type.",
  },
  allowsBranching: false,
  inputs: {
    connection: connectionInput,
    version: webhookVersion,
    eventAction,
    eventObject,
    userId: webhookUserId,
    httpAuthUser,
    httpAuthPassword,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: async (context, payload, params) => {
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "application/json",
      },
    });
  },
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, version, eventAction, eventObject, userId, httpAuthUser, httpAuthPassword },
    ) => {
      validateConnection(connection);
      await onInstanceDeploy(context, {
        connection,
        version,
        eventAction,
        eventObject,
        userId,
        httpAuthUser,
        httpAuthPassword,
      });
    },
    delete: async (
      context,
      { connection, version, eventAction, eventObject, userId, httpAuthUser, httpAuthPassword },
    ) => {
      validateConnection(connection);
      await onInstanceDelete(context, {
        connection,
        version,
        eventAction,
        eventObject,
        userId,
        httpAuthUser,
        httpAuthPassword,
      });
    },
  },
  examplePayload: pipedriveTriggerExamplePayload,
});
