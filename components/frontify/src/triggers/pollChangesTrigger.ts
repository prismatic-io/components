import { pollingTrigger } from "@prismatic-io/spectral";
import { listLibraryAssetsQuery } from "../actions/libraries/listLibraryAssets";
import type ListLibraryAssetsResponse from "../actions/types/listLibraryAssets";
import type { AssetResponse } from "../actions/types/shared";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollLibraryAssetsInputs } from "../inputs/triggers";
import type { PollingState } from "../types";
import { classifyAssetsByPollDate } from "../utils/classifyAssets";
import { graphqlFetchAll } from "../utils/graphqlFetchAll";
import type {
  FrontifyChangesObject,
  FrontifyRecordChange,
} from "../utils/polling";
import { resolvePollingRecordChanges } from "../utils/polling";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Assets",
    description:
      "Retrieves existing and ongoing Assets from Frontify. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollLibraryAssetsInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): FrontifyRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as FrontifyChangesObject),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();

    const lastPolledAt =
      pollState?.lastPolledAt ?? (params.lookBackDate || now);
    const isBackfill = !pollState?.lastPolledAt && Boolean(params.lookBackDate);

    const client = createClient({
      connection: params.connection,
      debug: context.debug.enabled,
    });

    const responses: ListLibraryAssetsResponse[] = await graphqlFetchAll({
      client,
      query: listLibraryAssetsQuery,
      params: { libraryId: params.libraryId, query: {} },
      hasNextPath: ["library", "assets", "hasNextPage"],
    });

    const assets: AssetResponse[] = responses.flatMap(
      (response) => response.library?.assets?.items ?? [],
    );

    const { created, updated } = classifyAssetsByPollDate(assets, lastPolledAt);
    const emittedCreated = isBackfill || params.showNewRecords ? created : [];
    const emittedUpdated =
      isBackfill || params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;

    context.polling.setState({ lastPolledAt: now });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Frontify assets: ${assets.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
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
