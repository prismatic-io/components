import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { newEmailsPollingTriggerInputs } from "../inputs/triggers";
import type { FetchMessageObject } from "imapflow";
import { simpleParser } from "mailparser";
import type { ImapPollingState, ImapStatusResult } from "../types";
import type { ImapRecordChange } from "../util/polling";
import { resolveImapRecordChanges } from "../util/polling";
export const newEmailsPollingTrigger = pollingTrigger({
  display: {
    label: "New Emails",
    description:
      "Retrieves existing and new emails for a specified IMAP mailbox. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newEmailsPollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): ImapRecordChange[] =>
      resolveImapRecordChanges(payload.body.data as unknown[]),
  },
  perform: async (
    context,
    payload,
    { connection, fetchContent, mailbox, markAsRead, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const client = createClient(connection, context.debug.enabled);
    await client.connect();
    try {
      const mailboxName = mailbox;
      const status = (await client.status(mailboxName, {
        uidNext: true,
        uidValidity: true,
        messages: true,
        recent: true,
        unseen: true,
        highestModseq: true,
      })) as ImapStatusResult;
      const currentUidNext = status.uidNext ?? 0;
      const currentUidValidity =
        typeof status.uidValidity === "bigint"
          ? util.types.toString(status.uidValidity)
          : util.types.toString(status.uidValidity ?? "");
      const state = context.polling.getState() as ImapPollingState;
      const isFirstPoll =
        !state.lastUidNext || state.uidValidity !== currentUidValidity;
      if (isFirstPoll && !lookBackDate) {
        context.polling.setState({
          lastUidNext: currentUidNext,
          uidValidity: currentUidValidity,
          lastPolledAt: now,
        });
        return {
          payload: { ...payload, body: { data: [] } },
          polledNoChanges: true,
        };
      }
      if (
        state.lastUidNext !== undefined &&
        currentUidNext <= state.lastUidNext
      ) {
        context.polling.setState({
          ...state,
          lastPolledAt: now,
        });
        return {
          payload: { ...payload, body: { data: [] } },
          polledNoChanges: true,
        };
      }
      await client.getMailboxLock(mailboxName);
      const shouldFetchContent = fetchContent;
      const shouldMarkAsRead = markAsRead;
      let uidRange: string;
      if (isFirstPoll && lookBackDate) {
        const searchDate = new Date(lookBackDate);
        const uids = (await client.search(
          { since: searchDate },
          { uid: true },
        )) as number[];
        if (!uids || uids.length === 0) {
          context.polling.setState({
            lastUidNext: currentUidNext,
            uidValidity: currentUidValidity,
            lastPolledAt: now,
          });
          return {
            payload: { ...payload, body: { data: [] } },
            polledNoChanges: true,
          };
        }
        uidRange = `${Math.min(...uids)}:*`;
      } else {
        uidRange = `${state.lastUidNext}:*`;
      }
      const rawMessages: FetchMessageObject[] = [];
      for await (const message of client.fetch(
        uidRange,
        {
          uid: true,
          envelope: true,
          flags: true,
          internalDate: true,
          size: true,
          source: shouldFetchContent,
        },
        { uid: true } as {
          uid: boolean;
          changedSince: bigint;
        },
      )) {
        rawMessages.push(message);
      }
      const emails = await Promise.all(
        rawMessages.map(async (message) => {
          const email: Record<string, unknown> = {
            uid: message.uid,
            envelope: message.envelope,
            flags: [...(message.flags ?? [])],
            internalDate: message.internalDate,
            size: message.size,
          };
          if (shouldFetchContent && message.source) {
            const parsed = await simpleParser(message.source);
            email.text = parsed.text;
            email.html = parsed.html;
            email.attachments = parsed.attachments.map(
              ({
                filename,
                size,
                contentType,
              }: {
                filename: string;
                size: number;
                contentType: string;
              }) => ({
                filename,
                size,
                contentType,
              }),
            );
          }
          return email;
        }),
      );
      if (shouldMarkAsRead && emails.length > 0) {
        await client.messageFlagsAdd(uidRange, ["\\Seen"], { uid: true });
      }
      context.polling.setState({
        lastUidNext: currentUidNext,
        uidValidity: currentUidValidity,
        lastPolledAt: now,
      });
      return {
        payload: { ...payload, body: { data: emails } },
        polledNoChanges: emails.length === 0,
      };
    } finally {
      client.close();
    }
  },
});
