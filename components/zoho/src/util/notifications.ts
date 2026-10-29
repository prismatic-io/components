import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  DisableSpecificNotificationParams,
  EnableNotificationParams,
  WatchConfig,
} from "../types";
import { fillNotificationsBody } from "./general";

export const enableNotificationChannel = async (
  client: HttpClient,
  params: EnableNotificationParams,
) => {
  const watchConfig: WatchConfig = {
    channel_id: params.channelId,
  };

  fillNotificationsBody(
    {
      token: params.token,
      channelExpiry: params.channelExpiry,
      notificationCondition: params.notificationCondition,
      events: params.events,
      notifyUrl: params.notifyUrl,
      notifyOnRelatedAction: params.notifyOnRelatedAction,
      returnAffectedFieldValues: params.returnAffectedFieldValues,
    },
    watchConfig,
  );

  const { data } = await client.post("/actions/watch", {
    watch: [watchConfig],
  });

  return data;
};

export const disableSpecificNotificationEvents = async (
  client: HttpClient,
  params: DisableSpecificNotificationParams,
) => {
  const watchConfig: Record<string, unknown> = {
    _delete_events: true,
    channel_id: params.channelId,
    events: params.events,
  };

  if (params.notifyOnRelatedAction !== undefined) {
    watchConfig.notify_on_related_action = params.notifyOnRelatedAction;
  }

  const { data } = await client.patch("/actions/watch", {
    watch: [watchConfig],
  });

  return data;
};
