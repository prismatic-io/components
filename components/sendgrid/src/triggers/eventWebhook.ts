import { trigger, util } from "@prismatic-io/spectral";
import { EventWebhook } from "@sendgrid/eventwebhook";
import { eventWebhookInputs } from "../inputs";
import { getBase64FromUrl } from "../util";
import { createAuthorizedClient } from "../client";
import {
  createWebhookHelper,
  deleteWebhookHelper,
  eventsBuilder,
  handleWebhookError,
  toggleSignatureVerificationHelper,
  updateWebhookHelper,
} from "../helpers";
import type { WebhookState } from "../types";

import { eventWebhookTriggerExamplePayload } from "../examplePayloads";

export const eventWebhook = trigger({
  display: {
    label: "Managed Webhook Events",
    description:
      "Receive event webhook notifications from SendGrid. Automatically creates and manages a webhook subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  webhookLifecycleHandlers: {
    create: async (
      { flow, crossFlowState, webhookUrls, logger, debug },
      { sendGridConnection, friendlyName, events },
    ) => {
      logger.info("Starting Event Webhook trigger creation process");

      const integrationFlowName = flow.name;
      const encodedId = getBase64FromUrl(webhookUrls[integrationFlowName]);
      const state = crossFlowState?.[encodedId] as unknown as WebhookState;
      const url = webhookUrls[flow.name];
      const enabled = true;
      const webhookId = state?.webhookId;
      const client = createAuthorizedClient(sendGridConnection);
      const eventsPayload = eventsBuilder(events);

      if (webhookId) {
        logger.info(
          `Webhook ID found, updating existing webhook for integration flow: ${integrationFlowName}`,
        );
        
        try {
          const data = await updateWebhookHelper(client, {
            webhookId,
            enabled,
            url,
            ...eventsPayload,
            friendlyName,
          });
          logger.info("Webhook updated successfully");
          if (debug.enabled) logger.info(JSON.stringify(data));
          crossFlowState[encodedId] = {
            webhookId: data.id,
          };
          return;
        } catch (e) {
          handleWebhookError(
            e,
            "update webhook on instance deployment",
            logger,
          );
        }
      }

      logger.info(
        `No webhook ID found, creating a new one for integration flow: ${integrationFlowName}`,
      );

      let newWebhookId: string;
      
      try {
        const data = await createWebhookHelper(client, {
          enabled,
          url,
          ...eventsPayload,
          friendlyName,
        });
        logger.info("Webhook created successfully");
        if (debug.enabled) logger.info(JSON.stringify(data));
        newWebhookId = data.id;
        crossFlowState[encodedId] = {
          webhookId: newWebhookId,
        };
      } catch (e) {
        handleWebhookError(e, "create webhook on instance deployment", logger);
      }

      try {
        const data = await toggleSignatureVerificationHelper(client, {
          webhookId: newWebhookId,
          enabled: true,
        });
        logger.info("Signature verification enabled successfully");
        if (debug.enabled) logger.info(JSON.stringify(data));

        crossFlowState[encodedId]["publicKey"] = data.public_key;
      } catch (e) {
        handleWebhookError(
          e,
          "enable signature verification on instance deployment",
          logger,
        );
      }
    },
    delete: async (
      { flow, crossFlowState, webhookUrls, logger },
      { sendGridConnection },
    ) => {
      logger.info(`Starting Event Webhook trigger deletion process`);

      const encodedId = getBase64FromUrl(webhookUrls[flow.name]);
      const state = crossFlowState?.[encodedId] as unknown as WebhookState;
      const webhookId = state?.webhookId;
      const client = createAuthorizedClient(sendGridConnection);

      if (webhookId) {
        try {
          await deleteWebhookHelper(client, {
            webhookId,
          });
          logger.info(
            `Webhook ${webhookId} deleted successfully for integration flow: ${flow.name}`,
          );
          delete crossFlowState[encodedId];
          return;
        } catch (e) {
          handleWebhookError(e, "delete webhook on instance deletion", logger);
        }
      }

      logger.info(
        `No webhook ID found, skipping webhook deletion for integration flow: ${flow.name}`,
      );
    },
  },
  perform: async (
    { webhookUrls, flow, crossFlowState, logger, debug },
    payload,
  ) => {
    const encodedId = getBase64FromUrl(webhookUrls[flow.name]);
    const state = crossFlowState?.[encodedId] as unknown as {
      webhookId: string;
      publicKey: string;
    };
    const publicKey = state?.publicKey;
    const headers = util.types.lowerCaseHeaders(payload.headers);

    const signature = headers[
      "x-twilio-email-event-webhook-signature"
    ] as string;
    const timestamp = headers[
      "x-twilio-email-event-webhook-timestamp"
    ] as string;

    if (!publicKey) {
      throw new Error(
        "Public key not found on state - webhook signature validation failed",
      );
    }
    if (!signature || !timestamp) {
      throw new Error(
        "SendGrid signature headers missing - webhook signature validation failed",
      );
    }

    const eventWebhook = new EventWebhook();
    const ecPublicKey = eventWebhook.convertPublicKeyToECDSA(publicKey);

    const rawPayload = payload.rawBody.data as string;

    const isValid = eventWebhook.verifySignature(
      ecPublicKey,
      rawPayload,
      signature,
      timestamp,
    );

    if (!isValid) {
      if (debug.enabled) logger.warn("Webhook signature validation failed");
      throw new Error(
        "Invalid webhook signature - request may not be from SendGrid",
      );
    }

    if (debug.enabled) logger.info("Webhook signature validated successfully");

    return {
      payload,
    };
  },
  inputs: eventWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: eventWebhookTriggerExamplePayload,
});
