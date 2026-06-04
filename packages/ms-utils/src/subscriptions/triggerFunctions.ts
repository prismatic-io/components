import {
  type Connection,
  type HttpResponse,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ActionContext } from "@prismatic-io/spectral/dist/serverTypes";
import type {
  CreateSubscriptionTriggerData,
  GraphSubscription,
} from "../interfaces/Subscriptions";
import type {
  CreateMsWebhookPerformOptions,
  SubscriptionBody,
  WebhookPerformResult,
} from "../interfaces/WebhookPerform";
import { getBase64FromUrl } from "../utils/helpers";
import {
  calculateExpirationDateTime,
  createSubscriptionFN,
  deleteAllSubscriptionsFN,
  scheduledRenewalFN,
} from "../utils/webhooks";

export const createSubscriptionTrigger = async (
  client: HttpClient,
  {
    resource,
    changeType,
    customHeaders,
    clientState,
    expirationDateTime,
    allowDuplicates,
    notificationUrl,
  }: CreateSubscriptionTriggerData,
  context: ActionContext,
): Promise<GraphSubscription> => {
  const flowId = context.flow.id;
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];

  const subscription = await createSubscriptionFN(
    client,
    {
      resource,
      changeType,
      notificationUrl: notificationUrl || webhookUrl,
      expirationDateTime: expirationDateTime || calculateExpirationDateTime(),
      clientState,
      customHeaders,
      allowDuplicates,
    },
    context,
  );

  context.logger.info(
    `Created Graph subscription ${subscription.id} for flow ${flowName} (${flowId})`,
  );

  return subscription;
};

export const deleteSubscriptionTrigger = async (
  client: HttpClient,
  context: ActionContext,
): Promise<void> => {
  const flowId = context.flow.id;
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];

  const deletedSubscriptions = await deleteAllSubscriptionsFN(
    client,
    webhookUrl,
  );

  context.logger.info(
    `Deleted ${deletedSubscriptions.length} Graph subscription(s) for flow ${flowName} (${flowId})`,
  );
};

export const triggerPerformFN = async (
  _context: ActionContext,
  payload: TriggerPayload,
  _params: Record<string, unknown>,
) => {
  const rawValidationToken = payload.queryParameters?.validationToken;
  const validationToken = util.types.toString(rawValidationToken);

  const response: HttpResponse = {
    statusCode: 200,
    contentType: "text/plain",
    body: validationToken,
  };

  return Promise.resolve({
    payload,
    response,
    branch: validationToken ? "URL Validation" : "Notification",
  });
};

export const createMsWebhookPerformFN = (
  options: CreateMsWebhookPerformOptions,
) => {
  const { createClient, renewalExpirationMinutes, fetchResourceData } = options;

  return async (
    context: ActionContext,
    payload: TriggerPayload,
    params: Record<string, unknown>,
  ): Promise<WebhookPerformResult> => {
    const rawValidationToken = payload.queryParameters?.validationToken;
    const validationToken = util.types.toString(rawValidationToken);
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const invokeType = headers["prismatic-invoke-type"];

    const response: HttpResponse = {
      statusCode: 200,
      contentType: "text/plain",
      body: validationToken,
    };

    if (validationToken) {
      return {
        payload,
        response,
        branch: "URL Validation",
      };
    }

    const subscriptionBody = payload.body.data as SubscriptionBody;

    if (invokeType === "Scheduled" && params?.connection) {
      const client = createClient(
        params.connection as Connection,
        context.debug.enabled,
      );
      const webhookUrl = context.webhookUrls[context.flow.name];
      const flowKey = getBase64FromUrl(webhookUrl);
      const storedSubscriptionId = context.crossFlowState[flowKey] as
        | string
        | undefined;

      const result = await scheduledRenewalFN(
        client,
        storedSubscriptionId,
        webhookUrl,
        renewalExpirationMinutes,
      );

      context.logger.info(
        `Renewed ${result.renewedCount} subscription(s)${result.usedUrlFallback ? " via URL fallback" : ""}`,
      );

      if (result.newSubscriptionId) {
        return {
          payload,
          response,
          branch: "Scheduled Renewal",
          crossFlowState: {
            [flowKey]: result.newSubscriptionId,
          },
        };
      }

      return {
        payload,
        response,
        branch: "Scheduled Renewal",
      };
    }

    if (subscriptionBody?.value?.length && params?.connection) {
      const client = createClient(
        params.connection as Connection,
        context.debug.enabled,
      );

      if (fetchResourceData) {
        await Promise.all(
          subscriptionBody.value.map(async (notification, index) => {
            if (notification?.changeType === "deleted") {
              return;
            }

            try {
              const resourceData = await fetchResourceData(
                client,
                notification,
                context,
                params,
              );
              if (resourceData) {
                subscriptionBody.value[index][resourceData.key] =
                  resourceData.data;
              }
            } catch (error) {
              context.logger.warn(
                `Failed to fetch resource data for ${notification?.resourceData?.id}: ${error}`,
              );
            }
          }),
        );
      }
    }

    return {
      payload,
      response,
      branch: "Notification",
    };
  };
};
