import {
  type ActionContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { autoRefreshWebhook } from "./autoRefreshWebhook";
import { listWebhookPayloads } from "./listWebhookPayloads";
import { validateMacSignature } from "./validateMacSignature";
import type {
  BaseChangesPerformParams,
  BaseChangesState,
} from "../../interfaces";
import { getBase64FromUrl } from "../../util";
import { webhookExists as webhookExistsHelper } from "./webhookExists";

export const baseChangesPerform = async (
  { flow, webhookUrls, crossFlowState, logger, debug }: ActionContext,
  payload: TriggerPayload,
  { airtableConnection, baseId }: BaseChangesPerformParams,
) => {
  const integrationFlowName = flow.name;
  const encodedId = getBase64FromUrl(webhookUrls[integrationFlowName]);
  const baseChangesState =
    (crossFlowState?.[encodedId] as unknown as BaseChangesState) ||
    ({} as BaseChangesState);

  if (debug) {
    logger.debug(
      "Base changes state",
      JSON.stringify(baseChangesState, null, 2),
    );
  }
  const {
    webhookId,
    expirationTime,
    cursor: lastCursor,
    macSecret,
  } = baseChangesState;

  if (!webhookId || !expirationTime || !macSecret) {
    throw new Error(
      "Missing required instance state properties, cannot process payload",
    );
  }

  const client = createAirtableClient(airtableConnection, debug.enabled);

  const webhookExists = await webhookExistsHelper({
    client,
    baseId,
    webhookId,
  });
  if (!webhookExists) {
    throw new Error(
      `Webhook ${webhookId} is deleted or expired, cannot process payload`,
    );
  }

  const headers = util.types.lowerCaseHeaders(payload.headers);
  const invokeType = headers["prismatic-invoke-type"];
  if (invokeType === "Scheduled") {
    logger.info(
      `${integrationFlowName} Trigger invoked by schedule - refreshing webhook`,
    );
    const newExpirationTime = await autoRefreshWebhook({
      client,
      baseId,
      webhookId,
      expirationTime,
      logger,
      debug: debug.enabled,
    });

    crossFlowState[encodedId] = {
      ...baseChangesState,
      expirationTime: newExpirationTime,
    };
    return {
      payload: {
        ...payload,
        body: {
          data: {
            expirationTime: newExpirationTime,
            message: "Webhook refreshed",
          },
        },
      },
      branch: "Refresh",
    };
  }

  validateMacSignature({
    macSecret,
    payload,
    logger,
    debug: debug.enabled,
  });

  const { allPayloads, currentCursor } = await listWebhookPayloads({
    client,
    baseId,
    webhookId,
    lastCursor,
    logger,
    debug: debug.enabled,
  });

  const newExpirationTime = await autoRefreshWebhook({
    client,
    baseId,
    webhookId,
    expirationTime,
    logger,
    debug: debug.enabled,
  });

  crossFlowState[encodedId] = {
    ...baseChangesState,
    cursor: currentCursor,
    expirationTime: newExpirationTime,
  };

  if (debug) {
    logger.info(
      `Retrieved ${allPayloads.length} total payloads, stored cursor: ${currentCursor}`,
    );
  }

  const transformedPayload = {
    ...payload,
    body: {
      data: {
        notification: payload.body.data,
        payloads: allPayloads,
        payloadCount: allPayloads.length,
        cursor: currentCursor,
      },
    },
  };

  return {
    payload: transformedPayload,
    branch: "Notification",
  };
};
