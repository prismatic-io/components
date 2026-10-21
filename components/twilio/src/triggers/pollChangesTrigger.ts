import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  PollingState,
  TwilioChangesObject,
  TwilioMessage,
  TwilioRecordChange,
} from "../types";
import {
  fetchMessagesSince,
  nextPollingState,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing messages from Twilio. Load history once, check for new messages on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): TwilioRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as TwilioChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = (context.polling.getState() ?? {}) as PollingState;
    const lookBack = params.lookBackDate;
    const isBackfill =
      pollState.backfillActive === true ||
      (!pollState.lastPolledAt && Boolean(lookBack));
    const lastPolledAt = pollState.lastPolledAt ?? (lookBack || now);
    const drainUntil = pollState.drainUntil;
    const { messages: fetched, truncated } = await fetchMessagesSince(
      params.connection,
      new Date(lastPolledAt),
      context.debug.enabled,
      params.from,
      params.to,
      drainUntil ? new Date(drainUntil) : undefined,
    );
    const delivered = new Set(pollState.boundarySids ?? []);
    const messages = fetched.filter((m) => !delivered.has(m.sid));
    const created: TwilioMessage[] =
      isBackfill || params.showNewRecords !== false ? messages : [];
    const updated: TwilioMessage[] = [];
    const { state, warnings } = nextPollingState(
      fetched,
      truncated,
      pollState,
      {
        lastPolledAt,
        now,
        isBackfill,
      },
    );
    for (const warning of warnings) context.logger.warn(warning);
    context.polling.setState(state);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Twilio messages: ${fetched.length} fetched, ${created.length} created, truncated=${truncated}`,
      );
    }
    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
