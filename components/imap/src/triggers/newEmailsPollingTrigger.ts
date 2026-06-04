import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { newEmailsPollingTriggerInputs } from "../inputs/triggers";
import { simpleParser } from "mailparser";
import type { FetchMessageObject } from "imapflow";
import type { ImapPollingState, ImapStatusResult } from "../types";

export const newEmailsPollingTrigger = pollingTrigger({
  display: {
    label: "New Emails",
    description:
      "Fetches new emails from a specified mailbox on a recurring schedule.",
  },
  inputs: newEmailsPollingTriggerInputs,
  perform: async (
    context,
    payload,
    { connection, fetchContent, mailbox, markAsRead },
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

      
      if (!state.lastUidNext || state.uidValidity !== currentUidValidity) {
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

      
      if (currentUidNext <= state.lastUidNext) {
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

      const uidRange = `${state.lastUidNext}:*`;

      
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
        { uid: true } as { uid: boolean; changedSince: bigint },
      )) {
        rawMessages.push(message);
      }

      
      const emails = await Promise.all(
        rawMessages.map(async (message) => {
          const email: Record<string, unknown> = {
            uid: message.uid,
            envelope: message.envelope,
            flags: [...message.flags],
            internalDate: message.internalDate,
            size: message.size,
          };

          if (shouldFetchContent && message.source) {
            const parsed = await simpleParser(message.source);
            email.text = parsed.text;
            email.html = parsed.html;
            email.attachments = parsed.attachments.map(
              ({ filename, size, contentType }) => ({
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
