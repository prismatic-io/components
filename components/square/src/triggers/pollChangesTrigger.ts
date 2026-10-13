import { pollingTrigger } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { TRIGGER_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  PaymentChange,
  PaymentChangesObject,
  PollingCursor,
  PollingState,
} from "../types";
import { pollPaymentsCycle, resolvePaymentChanges } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Payments",
    description:
      "Retrieves existing and ongoing payments from Square. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PaymentChange[] =>
      resolvePaymentChanges(payload.body.data as PaymentChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    { squareConnection, lookBackDate, showNewRecords, showUpdatedRecords },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );
    const incoming = payload.paginationState as PollingCursor | undefined;
    const cycle = await pollPaymentsCycle({
      client,
      state: (context.polling.getState() ?? {}) as PollingState,
      incoming,
      seed: lookBackDate ? new Date(lookBackDate) : new Date(),
      hasLookBackDate: Boolean(lookBackDate),
      batching: context.batch?.enabled === true,
    });
    context.polling.setState(cycle.state);
    const result: PaymentChangesObject = {
      created: cycle.backfill || showNewRecords ? cycle.created : [],
      updated: cycle.backfill || showUpdatedRecords ? cycle.updated : [],
    };
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled payments: ${cycle.read} read → ${cycle.created.length} new, ${cycle.updated.length} updated, ${cycle.next ? "more pending" : "stream drained"}`,
      );
    }
    return {
      payload: {
        ...payload,
        paginationState: cycle.next ?? undefined,
        body: { data: result },
      },
      polledNoChanges:
        !result.created?.length &&
        !result.updated?.length &&
        cycle.next === null &&
        !incoming,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
