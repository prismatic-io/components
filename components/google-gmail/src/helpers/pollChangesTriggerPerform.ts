import { listAllHistory } from "../utils";
import { createClient } from "../client";
import type { ActionContext, PollingContext, TriggerPayload } from "@prismatic-io/spectral";
import type { PollChangesTriggerParams, PollChangesTriggerState } from "../types";
import { getStartHistoryId } from "./getStartHistoryId";
import type { gmail_v1 } from "@googleapis/gmail";
import { getMessagesDetails } from "./getMessagesDetails";

export const pollChangesTriggerPerform = async (
  { polling, logger, debug }: ActionContext & PollingContext,
  payload: TriggerPayload,
  { connection, userId, labelId, getMessageDetails }: PollChangesTriggerParams,
) => {
  const client = await createClient(connection);
  let polledNoChanges = true;
  let reSyncRequired = false;
  const mailboxEmptyMessage = "No start history ID found to start polling, is your mailbox empty?";
  const pollState = polling.getState() as PollChangesTriggerState;
  const newLastPolledAt = new Date().toISOString();

  let startHistoryId = pollState.historyId;
  if (!startHistoryId) {
    startHistoryId = await getStartHistoryId(client, userId);
    if (!startHistoryId) {
      if (debug.enabled) {
        logger.warn(mailboxEmptyMessage);
      }
      return Promise.resolve({
        payload,
        polledNoChanges: true,
      });
    }
  }

  



  let data: gmail_v1.Schema$ListHistoryResponse;
  try {
    const { nextPageToken: _, ...restData } = await listAllHistory(
      client,
      {
        userId,
        startHistoryId,
        labelId,
      },
      true,
    );

    data = restData;
  } catch (e) {
    const error = e as { code: number; message: string };

    if (error.code === 404) {
      if (debug.enabled) {
        logger.error(error.message);
        logger.warn("Start history ID is no longer valid, retrieving new start history ID");
      }
      reSyncRequired = true;
      startHistoryId = await getStartHistoryId(client, userId);

      if (!startHistoryId) {
        if (debug.enabled) {
          logger.warn(mailboxEmptyMessage);
        }
        return Promise.resolve({
          payload,
          polledNoChanges: true,
        });
      }

      const { nextPageToken: _, ...restData } = await listAllHistory(
        client,
        {
          userId,
          startHistoryId,
          labelId,
        },
        true,
      );
      data = restData;
    } else {
      throw error;
    }
  }

  if (getMessageDetails) {
    if (data.history.length > 0) {
      const newHistory = [];

      for (const history of data.history) {
        const detailedMessages = await getMessagesDetails(
          client,
          history.messages,
          userId,
          debug.enabled,
          logger,
        );
        const { messages: _, ...historyWithoutMessages } = history;
        newHistory.push({
          ...historyWithoutMessages,
          messages: history.messages.map((message, index) => ({
            ...message,
            message: detailedMessages[index],
          })),
        });
      }
      data = { history: newHistory, historyId: data.historyId };
    }
  }
  if (data.history.length > 0) {
    polledNoChanges = false;
  }
  let lastPolledAt = pollState.lastPolledAt;
  if (!lastPolledAt || reSyncRequired) {
    lastPolledAt = newLastPolledAt;
  }
  logger.debug(`Polling for changes from ${lastPolledAt} to ${newLastPolledAt}`);

  polling.setState({
    historyId: data.historyId,
    lastPolledAt: newLastPolledAt,
  } as PollChangesTriggerState);
  return Promise.resolve({
    payload: { ...payload, body: { data } },
    polledNoChanges,
  });
};
