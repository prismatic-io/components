import { pollingTrigger } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  CalendlyEvent,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  classifyEventsByPollDate,
  getEvents,
  resolvePollingRecordChanges,
} from "../util";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Events",
    description:
      "Checks for new and updated Events in Calendly on a configured schedule.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    if (!pollState?.lastPolledAt) {
      const seedDate = params.lookBackDate || now;
      context.polling.setState({ lastPolledAt: seedDate });
      if (!params.lookBackDate) {
        return {
          payload: {
            ...payload,
            body: { data: { created: [], updated: [] } },
          },
          polledNoChanges: true,
        };
      }
    }
    const lastPolledAt = pollState?.lastPolledAt ?? params.lookBackDate ?? now;
    const client = getCalendlyClient(params.connection, context.debug.enabled);
    const events = (await getEvents(
      client,
      undefined,
      undefined,
      undefined,
      params.organization,
      undefined,
      undefined,
      params.user,
    )) as CalendlyEvent[];
    const { created, updated } = classifyEventsByPollDate(events, lastPolledAt);
    const emittedCreated = params.showNewRecords ? created : [];
    const emittedUpdated = params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Calendly events: ${events.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { created: emittedCreated, updated: emittedUpdated } },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
