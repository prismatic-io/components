import { type TriggerPayload, trigger, util } from "@prismatic-io/spectral";
import { pushNotificationWebhookInputs } from "../inputs";
import {
  getMessagesDetails,
  pushNotificationWebhookCreate,
  pushNotificationWebhookDelete,
} from "../helpers";
import type { GmailNotificationBody } from "../interfaces";
import { managedPushNotificationEventsExamplePayload } from "../examplePayloads";
import { createClient } from "../client";
import { createWatchFn, parseWatchExpiration } from "../watchUtils";
import { generatePrefixedHash, getBase64FromUrl, listAllHistory } from "../utils";

export const managedPushNotificationEvents = trigger({
  display: {
    label: "Managed Push Notification Events",
    description:
      "Receive mailbox event notifications from Gmail. Automatically creates and manages a Push Notifications subscription for mailbox events when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  perform: async (context, payload, { connection, topicId, projectId, userId, labelIds }) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const invokeType = headers["prismatic-invoke-type"];
    if (invokeType === "Scheduled") {
      context.logger.info(`${context.flow.name} Trigger invoked by schedule - renewing webhook`);

      const integrationFlowName = context.flow.name;
      const encodedId = getBase64FromUrl(context.webhookUrls[integrationFlowName]);
      const prefixedTopicId = generatePrefixedHash(topicId, encodedId);
      const topicName = `projects/${projectId}/topics/${prefixedTopicId}`;

      const client = await createClient(connection);
      context.logger.info(
        `Renewing push notification schedule for user ${userId} and topic ${topicName}`,
      );
      const watchResponse = await createWatchFn(client, userId, topicName, labelIds || []);
      context.logger.info(`Watch created successfully for user ${userId} and topic ${topicName}`);
      const expirationDate = parseWatchExpiration(watchResponse.expiration);
      const hoursExtended = Math.round((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60));
      context.logger.info(`Hours extended: ${hoursExtended}`);
      return {
        payload,
        branch: "Log Messages",
        response: { statusCode: 200, contentType: "text/plain" },
      };
    }
    const integrationFlowName = context.flow.name;
    const encodedId = getBase64FromUrl(context.webhookUrls[integrationFlowName]);
    const state = context.crossFlowState?.[encodedId] as unknown as {
      historyId: string;
    };

    const finalPayload: TriggerPayload = { ...payload };
    let message: GmailNotificationBody["message"];
    try {
      message = (finalPayload.body.data as GmailNotificationBody).message;
      message.decodedData = JSON.parse(Buffer.from(message.data, "base64").toString("utf-8"));
    } catch (error) {
      throw new Error(`Error parsing data. Was this message sent from Gmail? Error: ${error}`);
    }
    if (!state?.historyId) {
      throw new Error("History ID not found in cross flow state. This should not happen.");
    }
    const client = await createClient(connection);
    const startHistoryId = state.historyId;
    const data = await listAllHistory(
      client,
      {
        userId: "me",
        startHistoryId,
      },
      true,
    );
    const messages = [];
    if (data.history.length > 0) {
      for (const history of data.history) {
        const detailedMessages = await getMessagesDetails(
          client,
          history.messages,
          userId,
          context.debug.enabled,
          context.logger,
        );

        messages.push(...detailedMessages);
      }
    }

    context.crossFlowState[encodedId] = {
      historyId: data.historyId,
    };

    finalPayload.body.data = {
      ...(finalPayload.body.data as object),
      message,
      messages,
    };
    return {
      payload,
      branch: "Push Notifications",
      response: { statusCode: 200, contentType: "text/plain" },
    };
  },
  inputs: pushNotificationWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "valid",
  allowsBranching: true,
  staticBranchNames: ["Push Notifications", "Log Messages"],
  examplePayload: managedPushNotificationEventsExamplePayload,
  webhookLifecycleHandlers: {
    create: pushNotificationWebhookCreate,
    delete: pushNotificationWebhookDelete,
  },
});
