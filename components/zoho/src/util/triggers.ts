import { type ActionContext, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import type { BookRecord, CRMRecord, NotificationTriggerInputs, ZohoRecord } from "../types";
import { disableSpecificNotificationEvents, enableNotificationChannel } from "./notifications";

export const getCRMModifiedOrCreatedRecords = (records: CRMRecord[], lastUpdated: string) => {
  return records.reduce(
    (previous, current) => {
      const createdDate = new Date(current.Created_Time);
      const modifiedDate = new Date(current.Modified_Time);
      if (createdDate >= new Date(lastUpdated)) {
        previous.created.push(current);
      } else if (modifiedDate >= new Date(lastUpdated)) {
        previous.updated.push(current);
      }
      return previous;
    },
    {
      updated: [] as CRMRecord[],
      created: [] as CRMRecord[],
    },
  );
};

export const polledChanges = (filteredRecords: {
  created: ZohoRecord[];
  updated: ZohoRecord[];
}) => {
  return filteredRecords.created.length === 0 && filteredRecords.updated.length === 0;
};

export const getBooksModifiedOrCreatedRecords = <T extends BookRecord>(
  records: T[],
  lastUpdated: string,
) => {
  return records.reduce(
    (previous, current) => {
      const createdDate = new Date(current.created_time);
      const modifiedDate = new Date(current.last_modified_time);
      if (createdDate >= new Date(lastUpdated)) {
        previous.created.push(current);
      } else if (modifiedDate >= new Date(lastUpdated)) {
        previous.updated.push(current);
      }
      return previous;
    },
    {
      updated: [] as T[],
      created: [] as T[],
    },
  );
};

export const createNotificationTrigger = async (
  context: ActionContext,
  {
    connection,
    channelId,
    events,
    token,
    channelExpiry,
    returnAffectedFieldValues,
    notifyOnRelatedAction,
    notificationCondition,
  }: NotificationTriggerInputs,
) => {
  const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const finalChannelId = getChannelId(channelId);

  try {
    await enableNotificationChannel(crmClient, {
      channelId: finalChannelId,
      events,
      notifyUrl: webhookUrl,
      token,
      channelExpiry,
      returnAffectedFieldValues,
      notifyOnRelatedAction,
      notificationCondition,
    });
    context.crossFlowState.zohoChannelId = finalChannelId;

    context.logger.info(`Created notification channel ${finalChannelId} for flow ${flowName}`);
  } catch (error) {
    context.logger.error(
      `Failed to create notification channel ${finalChannelId} for flow ${flowName}: ${error}`,
    );
    throw error;
  }
};

export const deleteNotificationTrigger = async (
  context: ActionContext,
  { connection, channelId, events, notifyOnRelatedAction }: NotificationTriggerInputs,
) => {
  const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

  const flowName = context.flow.name;
  const storedChannelId = context.crossFlowState.zohoChannelId as number | undefined;
  const notificationChannelId = storedChannelId ?? channelId;

  if (notificationChannelId == null || notificationChannelId === "") {
    context.logger.error(
      "No channel ID provided or stored in instance state; cannot disable notifications",
    );
    throw new Error(
      "No channel ID provided or stored in instance state; cannot disable notifications",
    );
  }

  context.logger.debug(`Deleting notification for channel ${notificationChannelId}`);

  try {
    await disableSpecificNotificationEvents(crmClient, {
      channelId: notificationChannelId,
      events,
      notifyOnRelatedAction,
    });

    context.logger.info(
      `Disabled specific event notifications for channel ${notificationChannelId} in flow ${flowName}`,
    );
  } catch (error) {
    context.logger.error(
      `Failed to disable notification events for channel ${notificationChannelId}: ${error}`,
    );
    throw error;
  }
};

export const getChannelId = (channelId: number | string | undefined): number => {
  if (channelId !== undefined) {
    const parsed = util.types.toNumber(channelId);
    if (!Number.isNaN(parsed) && parsed !== 0) {
      return parsed;
    }
  }

  return Math.floor(Date.now() / 1000);
};
