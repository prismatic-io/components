import type { ActionContext } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import { createSubscriptionFN, type GraphSubscription } from "ms-utils";
import type {
  DriveSubscriptionParams,
  LifecycleNotification,
  WebhookNotification,
} from "../types";

export const isLifecycleNotification = (
  notification: WebhookNotification | LifecycleNotification,
): notification is LifecycleNotification => "lifecycleEvent" in notification;

export const createDriveSubscription = async (
  client: HttpClient,
  context: ActionContext,
  { resource, changeType, clientState }: DriveSubscriptionParams,
  expirationDateTime: string,
): Promise<GraphSubscription> => {
  const notificationUrl = context.webhookUrls[context.flow.name];
  const subscription = await createSubscriptionFN(
    client,
    {
      resource,
      changeType,
      notificationUrl,
      expirationDateTime,
      clientState,
      allowDuplicates: false,
      customBody: { lifecycleNotificationUrl: notificationUrl },
    },
    context,
  );

  context.logger.info(
    `Graph subscription ${subscription.id} serves flow ${context.flow.name} (${context.flow.id})`,
  );

  return subscription;
};
