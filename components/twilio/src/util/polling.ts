import type { Connection } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import type {
  PollingState,
  TwilioChangesObject,
  TwilioMessage,
  TwilioRecordChange,
} from "../types";

const MAX_POLL_LIMIT = 10000;
const POLL_PAGE_SIZE = 100;

export const fetchMessagesSince = async (
  connection: Connection,
  dateSentAfter: Date,
  debug: boolean,
  from?: string,
  to?: string,
  dateSentBefore?: Date,
): Promise<{ messages: TwilioMessage[]; truncated: boolean }> => {
  const client = createAuthorizedClient(connection, debug);
  const messages = await client.messages.list({
    dateSentAfter,
    ...(dateSentBefore && { dateSentBefore }),
    ...(from && { from }),
    ...(to && { to }),
    pageSize: POLL_PAGE_SIZE,
    limit: MAX_POLL_LIMIT,
  });
  return {
    messages: messages.map((m) => m.toJSON()) as TwilioMessage[],
    truncated: messages.length >= MAX_POLL_LIMIT,
  };
};

const toSecond = (date: Date): number => Math.floor(date.getTime() / 1000);

export const nextPollingState = (
  fetched: TwilioMessage[],
  truncated: boolean,
  pollState: PollingState,
  opts: { lastPolledAt: string; now: string; isBackfill: boolean },
): { state: PollingState; warnings: string[] } => {
  if (!truncated) {
    return {
      state: { lastPolledAt: pollState.highWater ?? opts.now },
      warnings: [],
    };
  }

  const oldest = fetched
    .map((m) => m.dateSent)
    .filter((d): d is Date => d instanceof Date)
    .reduce<Date | null>((min, d) => (min === null || d < min ? d : min), null);
  if (oldest === null) {
    return {
      state: { lastPolledAt: opts.now },
      warnings: [
        "Polling truncated at the message limit for Twilio, but no fetched message has a send date to walk back from. Advancing to the current time.",
      ],
    };
  }

  const warnings: string[] = [];
  const oldestSecond = toSecond(oldest);
  let drainUntil = oldest;
  let boundarySids = fetched
    .filter(
      (m) =>
        m.dateSent instanceof Date && toSecond(m.dateSent) === oldestSecond,
    )
    .map((m) => m.sid);

  if (
    pollState.drainUntil &&
    toSecond(new Date(pollState.drainUntil)) === oldestSecond
  ) {
    drainUntil = new Date((oldestSecond - 1) * 1000);
    boundarySids = [];
    warnings.push(
      `More than one page of Twilio messages share the second ${oldest.toISOString()}; messages in that second beyond the page limit are skipped.`,
    );
  }
  warnings.push(
    `Polling truncated at the message limit for Twilio. Draining messages sent before ${drainUntil.toISOString()} on the next recurrence.`,
  );

  return {
    state: {
      lastPolledAt: opts.lastPolledAt,
      drainUntil: drainUntil.toISOString(),
      highWater: pollState.highWater ?? opts.now,
      boundarySids,
      ...(opts.isBackfill ? { backfillActive: true } : {}),
    },
    warnings,
  };
};

export const resolvePollingRecordChanges = (
  data: TwilioChangesObject | undefined,
): TwilioRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): TwilioRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): TwilioRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
