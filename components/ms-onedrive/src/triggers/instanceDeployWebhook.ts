import { trigger, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import {
  calculateExpirationDateTime,
  deleteSubscriptionTrigger,
  getBase64FromUrl,
  renewSubscriptionFN,
  scheduledRenewalFN,
} from "ms-utils";
import { getOneDriveClient } from "../client";
import {
  RENEWAL_EXPIRATION_MINUTES,
  SUBSCRIPTION_TIMEOUT_MS,
} from "../constants";
import { TriggerBranches } from "../enums";
import { instanceDeployWebhookExamplePayload } from "../examplePayloads";
import { instanceDeployWebhookInputs } from "../inputs";
import type { GraphNotificationPayload } from "../types";
import { createDriveSubscription, isLifecycleNotification } from "../util";

export const instanceDeployWebhook = trigger({
  display: {
    label: "Drive Subscription",
    description:
      "Receive webhook notifications from OneDrive drives. Automatically creates and manages a webhook subscription when the instance is deployed, and removes the subscription when the instance is deleted. Supports scheduled renewal to keep the subscription active.",
  },
  scheduleSupport: "valid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  inputs: instanceDeployWebhookInputs,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
    TriggerBranches.ScheduledRenewal,
    TriggerBranches.LifecycleEvent,
  ],
  examplePayload: instanceDeployWebhookExamplePayload,
  perform: async (context, payload, params) => {
    const rawValidationToken = payload.queryParameters?.validationToken;
    const validationToken = util.types.toString(rawValidationToken);

    if (validationToken) {
      return {
        payload,
        response: {
          statusCode: 200,
          contentType: "text/plain",
          body: validationToken,
        },
        branch: TriggerBranches.URLValidation,
      };
    }

    const webhookUrl = context.webhookUrls[context.flow.name];
    const flowKey = getBase64FromUrl(webhookUrl);
    const invokeType = util.types.lowerCaseHeaders(payload.headers)[
      "prismatic-invoke-type"
    ];

    if (invokeType === "Scheduled") {
      const client = getOneDriveClient(
        params.oneDriveConnection,
        context.debug.enabled,
        SUBSCRIPTION_TIMEOUT_MS,
      );
      const renewal = await scheduledRenewalFN(
        client,
        util.types.toString(context.crossFlowState[flowKey]),
        webhookUrl,
        RENEWAL_EXPIRATION_MINUTES,
        RENEWAL_EXPIRATION_MINUTES,
      );

      if (renewal.renewedCount > 0) {
        context.logger.info(
          `Renewed ${renewal.renewedCount} subscription(s)${renewal.usedUrlFallback ? " via URL fallback" : ""}`,
        );
        return {
          payload,
          branch: TriggerBranches.ScheduledRenewal,
          ...(renewal.newSubscriptionId
            ? { crossFlowState: { [flowKey]: renewal.newSubscriptionId } }
            : {}),
        };
      }

      context.logger.info(
        "No subscription left to renew for this flow; creating a new one.",
      );
      const subscription = await createDriveSubscription(
        client,
        context,
        params,
        calculateExpirationDateTime(
          RENEWAL_EXPIRATION_MINUTES,
          RENEWAL_EXPIRATION_MINUTES,
        ),
      );
      return {
        payload,
        branch: TriggerBranches.ScheduledRenewal,
        crossFlowState: { [flowKey]: subscription.id },
      };
    }

    const body = payload.body?.data as GraphNotificationPayload | undefined;
    const notifications = Array.isArray(body?.value) ? body.value : [];

    const expectedClientState = params.clientState;
    if (expectedClientState && notifications.length > 0) {
      const receivedClientState = notifications[0]?.clientState;
      if (receivedClientState !== expectedClientState) {
        context.logger.warn(
          "ClientState mismatch in webhook notification. Expected: [REDACTED], Received: [REDACTED]",
        );
      }
    }

    const lifecycleNotices = notifications.filter(isLifecycleNotification);
    const lifecycleEvents = lifecycleNotices.filter(
      (event) =>
        !expectedClientState || event.clientState === expectedClientState,
    );
    if (lifecycleNotices.length > 0) {
      let client: HttpClient | undefined;
      const graphClient = (): HttpClient => {
        client ??= getOneDriveClient(
          params.oneDriveConnection,
          context.debug.enabled,
          SUBSCRIPTION_TIMEOUT_MS,
        );
        return client;
      };
      let subscriptionId: string | undefined;

      for (const event of lifecycleEvents) {
        if (event.lifecycleEvent === "reauthorizationRequired") {
          try {
            await renewSubscriptionFN(
              graphClient(),
              event.subscriptionId,
              RENEWAL_EXPIRATION_MINUTES,
              RENEWAL_EXPIRATION_MINUTES,
            );
            subscriptionId = event.subscriptionId;
            context.logger.info(
              `Reauthorized and renewed subscription ${event.subscriptionId} after a Graph lifecycle challenge.`,
            );
          } catch {
            const subscription = await createDriveSubscription(
              graphClient(),
              context,
              params,
              calculateExpirationDateTime(
                RENEWAL_EXPIRATION_MINUTES,
                RENEWAL_EXPIRATION_MINUTES,
              ),
            );
            subscriptionId = subscription.id;
            context.logger.warn(
              subscription.id === event.subscriptionId
                ? `Renewing subscription ${event.subscriptionId} after a Graph lifecycle challenge failed; it is still active and the next scheduled renewal will retry.`
                : `Renewing subscription ${event.subscriptionId} after a Graph lifecycle challenge failed; created ${subscription.id} in its place.`,
            );
          }
        } else if (event.lifecycleEvent === "subscriptionRemoved") {
          const subscription = await createDriveSubscription(
            graphClient(),
            context,
            params,
            calculateExpirationDateTime(
              RENEWAL_EXPIRATION_MINUTES,
              RENEWAL_EXPIRATION_MINUTES,
            ),
          );
          subscriptionId = subscription.id;
          context.logger.info(
            `Graph removed subscription ${event.subscriptionId}; created ${subscription.id} in its place.`,
          );
        } else {
          context.logger.warn(
            `Graph reported missed notifications for subscription ${event.subscriptionId}. Run a delta query to catch up.`,
          );
        }
      }

      return {
        payload,
        response: { statusCode: 202, contentType: "text/plain" },
        branch: TriggerBranches.LifecycleEvent,
        ...(subscriptionId
          ? { crossFlowState: { [flowKey]: subscriptionId } }
          : {}),
      };
    }

    return {
      payload,
      branch: TriggerBranches.Notification,
    };
  },
  webhookLifecycleHandlers: {
    create: async (context, params) => {
      const client = getOneDriveClient(
        params.oneDriveConnection,
        context.debug.enabled,
        SUBSCRIPTION_TIMEOUT_MS,
      );

      context.logger.info(
        `Creating OneDrive subscription for resource: ${params.resource}`,
      );

      const subscription = await createDriveSubscription(
        client,
        context,
        params,
        params.expirationDateTime,
      );

      return {
        crossFlowState: {
          [getBase64FromUrl(context.webhookUrls[context.flow.name])]:
            subscription.id,
        },
      };
    },
    delete: async (context, params) => {
      const client = getOneDriveClient(
        params.oneDriveConnection,
        context.debug.enabled,
        SUBSCRIPTION_TIMEOUT_MS,
      );

      context.logger.info("Deleting OneDrive subscription(s) for this flow");

      await deleteSubscriptionTrigger(client, context);

      return {
        crossFlowState: {
          [getBase64FromUrl(context.webhookUrls[context.flow.name])]: null,
        },
      };
    },
  },
});
