import { pollingTrigger } from "@prismatic-io/spectral";
import { getGuruClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollCardsInputs } from "../inputs";
import type {
  GuruCard,
  GuruChangesObject,
  GuruRecordChange,
  PollingState,
} from "../types";
import {
  classifyCardsByPollDate,
  fetchGuruResults,
  resolvePollingRecordChanges,
  toGuruDateFilter,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Cards",
    description:
      "Retrieves existing and ongoing Cards from Guru. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollCardsInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): GuruRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as GuruChangesObject),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    const isInitialSync =
      !pollState?.lastPolledAt && Boolean(params.lookBackDate);
    const lastPolledAt =
      pollState?.lastPolledAt ??
      (params.lookBackDate ? new Date(params.lookBackDate).toISOString() : now);
    const client = getGuruClient(params.connection, context.debug.enabled);
    const q = `lastModified > ${toGuruDateFilter(lastPolledAt)}`;
    const cards = await fetchGuruResults<GuruCard>(
      client,
      "/search/query",
      true,
      { q },
    );
    const { created, updated } = classifyCardsByPollDate(cards, lastPolledAt);
    const emittedCreated =
      isInitialSync || params.showNewRecords ? created : [];
    const emittedUpdated =
      isInitialSync || params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Guru cards: ${cards.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
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
