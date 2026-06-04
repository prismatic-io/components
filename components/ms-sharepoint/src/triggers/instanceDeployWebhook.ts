import { trigger, util } from "@prismatic-io/spectral";
import { TriggerBranches } from "../actions/enums";
import { createClient } from "../client";
import { instanceDeployWebhookInputs } from "../inputs";
import type { WebhookNotificationPayload } from "../interfaces";
import {
  createSubscriptionTrigger,
  deleteSubscriptionTrigger,
  calculateExpirationDateTime,
} from "ms-utils";

export const instanceDeployWebhook = trigger({
  display: {
    label: "Drive Subscription",
    description:
      "Receive webhook notifications from SharePoint drives. Automatically creates and manages a webhook subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  inputs: instanceDeployWebhookInputs,
  staticBranchNames: [TriggerBranches.Notification, TriggerBranches.URLValidation],
  perform: async (context, payload, params) => {
    
    
    const rawValidationToken = payload.queryParameters?.validationToken;
    const validationToken = util.types.toString(rawValidationToken);

    
    const expectedClientState = params.clientState;
    if (expectedClientState) {
      const body = payload.body?.data as WebhookNotificationPayload | undefined;
      const notifications = body?.value;
      if (Array.isArray(notifications) && notifications.length > 0) {
        const receivedClientState = notifications[0]?.clientState;
        if (receivedClientState !== expectedClientState) {
          context.logger.warn("ClientState mismatch in webhook notification.");
        }
      }
    }

    if (validationToken) {
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          contentType: "text/plain",
          body: validationToken,
        },
        branch: TriggerBranches.URLValidation,
      });
    }

    return Promise.resolve({
      payload,
      branch: TriggerBranches.Notification,
    });
  },
  webhookLifecycleHandlers: {
    create: async (context, params) => {
      const client = await createClient(params.connection, context.debug.enabled);

      
      const expiration = params.expirationDateTime || calculateExpirationDateTime(3);

      context.logger.info(`Creating SharePoint subscription for resource: ${params.resource}`);

      await createSubscriptionTrigger(
        client,
        {
          resource: params.resource,
          changeType: params.changeType,
          clientState: params.clientState,
          expirationDateTime: expiration,
          allowDuplicates: false,
        },
        context,
      );
    },
    delete: async (context, params) => {
      const client = await createClient(params.connection, context.debug.enabled);

      context.logger.info("Deleting SharePoint subscription(s) for this flow");

      await deleteSubscriptionTrigger(client, context);
    },
  },
});
