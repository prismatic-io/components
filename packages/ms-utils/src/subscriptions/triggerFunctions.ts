import { type Connection, util } from "@prismatic-io/spectral";
import type {
  BoundaryActionContext as ActionContext,
  BoundaryTriggerPayload,
  BoundaryHttpClient as HttpClient,
  BoundaryHttpResponse as HttpResponse,
} from "../interfaces/boundary";
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
  deleteSubscriptionByIdFN,
  listAllSubscriptionsFN,
  scheduledRenewalFN,
} from "../utils/webhooks";
import {
  HTTP_STATUS_NOT_FOUND,
  SUBSCRIPTION_ID_SEPARATOR,
  UNDELETED_SUBSCRIPTIONS_KEY_SUFFIX,
} from "./constants";

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

export const replaceSubscriptionOnDeploy = async (
  client: HttpClient,
  {
    resource,
    changeType,
    clientState,
    expirationDateTime,
  }: Omit<
    CreateSubscriptionTriggerData,
    "allowDuplicates" | "notificationUrl" | "customHeaders"
  >,
  context: ActionContext,
): Promise<{
  subscription: GraphSubscription;
  crossFlowState: Record<string, unknown>;
}> => {
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const flowKey = getBase64FromUrl(webhookUrl);
  const undeletedKey = `${flowKey}${UNDELETED_SUBSCRIPTIONS_KEY_SUFFIX}`;
  const previousIds = [
    util.types.toString(context.crossFlowState[flowKey]),
    ...readSubscriptionIds(context.crossFlowState[undeletedKey]),
  ];

  const subscription = await createSubscriptionFN(
    client,
    {
      resource,
      changeType,
      notificationUrl: webhookUrl,
      expirationDateTime: expirationDateTime || calculateExpirationDateTime(),
      clientState,
      allowDuplicates: true,
    },
    context,
  );

  const listed = await listAllSubscriptionsFN(client);
  const staleIds = new Set(
    listed
      .filter(
        ({ id, notificationUrl }) =>
          id && notificationUrl === webhookUrl && id !== subscription.id,
      )
      .map(({ id }) => util.types.toString(id)),
  );
  for (const previousId of previousIds) {
    if (previousId && previousId !== subscription.id) {
      staleIds.add(previousId);
    }
  }

  const { failed } = await deleteSubscriptionsByIdFN(
    client,
    [...staleIds],
    context,
  );

  context.logger.info(
    `Created Graph subscription ${subscription.id} for flow ${flowName} (${context.flow.id}); replaced ${staleIds.size} previous subscription(s)`,
  );

  return {
    subscription,
    crossFlowState: {
      [flowKey]: subscription.id,
      [undeletedKey]: failed.join(SUBSCRIPTION_ID_SEPARATOR),
    },
  };
};

const readSubscriptionIds = (value: unknown): string[] =>
  util.types
    .toString(value)
    .split(SUBSCRIPTION_ID_SEPARATOR)
    .filter((id) => id);

const isNotFoundError = (reason: unknown): boolean => {
  if (
    !(reason instanceof Error) ||
    !("response" in reason) ||
    !reason.response
  ) {
    return false;
  }
  const response = util.types.toObject(reason.response);
  return (
    "status" in response &&
    util.types.toNumber(response.status) === HTTP_STATUS_NOT_FOUND
  );
};

const deleteSubscriptionsByIdFN = async (
  client: HttpClient,
  ids: string[],
  context: ActionContext,
): Promise<{ deleted: string[]; failed: string[] }> => {
  const results = await Promise.allSettled(
    ids.map((id) => deleteSubscriptionByIdFN(client, id)),
  );
  const deleted: string[] = [];
  const failed: string[] = [];
  ids.forEach((id, index) => {
    const result = results[index];
    if (result.status === "fulfilled") {
      deleted.push(id);
    } else if (isNotFoundError(result.reason)) {
      context.logger.info(`Graph subscription ${id} no longer exists`);
    } else {
      context.logger.warn(
        `Could not delete Graph subscription ${id}: ${result.reason}`,
      );
      failed.push(id);
    }
  });
  return { deleted, failed };
};

export const deleteSubscriptionTrigger = async (
  client: HttpClient,
  context: ActionContext,
): Promise<void> => {
  const flowId = context.flow.id;
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const flowKey = getBase64FromUrl(webhookUrl);
  const storedIds = [
    util.types.toString(context.crossFlowState[flowKey]),
    ...readSubscriptionIds(
      context.crossFlowState[`${flowKey}${UNDELETED_SUBSCRIPTIONS_KEY_SUFFIX}`],
    ),
  ];

  const listedIds = (await listAllSubscriptionsFN(client))
    .filter(({ id, notificationUrl }) => id && notificationUrl === webhookUrl)
    .map(({ id }) => util.types.toString(id));
  const ids = new Set([...listedIds, ...storedIds.filter((id) => id)]);

  const { deleted, failed } = await deleteSubscriptionsByIdFN(
    client,
    [...ids],
    context,
  );

  context.logger.info(
    `Deleted ${deleted.length} Graph subscription(s) for flow ${flowName} (${flowId})`,
  );

  const failedListed = failed.filter((id) => listedIds.includes(id));
  if (failedListed.length) {
    throw new Error(
      `Could not delete Graph subscription(s) ${failedListed.join(", ")} for flow ${flowName} (${flowId})`,
    );
  }
};

export const triggerPerformFN = async <TPayload extends BoundaryTriggerPayload>(
  _context: ActionContext,
  payload: TPayload,
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

  return async <TPayload extends BoundaryTriggerPayload>(
    context: ActionContext,
    payload: TPayload,
    params: Record<string, unknown>,
  ): Promise<WebhookPerformResult<TPayload>> => {
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
