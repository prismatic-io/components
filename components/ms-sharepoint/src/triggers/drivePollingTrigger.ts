import { pollingTrigger } from "@prismatic-io/spectral";
import { drivePollingTriggerInputs } from "../inputs";
import { drivePollingTriggerExamplePayload } from "../examplePayloads";
import { createClient } from "../client";
import {
  fetchDeltaRound,
  paginateResults,
  resolveDeltaUrl,
  resolvePollingRecordChanges,
  separateDriveChanges,
} from "../util";
import type {
  DeltaCursor,
  DriveDeltaResponse,
  PollingState,
  PollingRecordChange,
  PollSiteChangesSeparatedChanges,
} from "../types";

export const drivePollingTrigger = pollingTrigger({
  display: {
    label: "Drive Item Changes",
    description:
      "Checks for new and updated items in a specified SharePoint drive on a configured schedule.",
  },
  inputs: drivePollingTriggerInputs,
  examplePayload: drivePollingTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollSiteChangesSeparatedChanges),
    getNextPaginationState: (_context, { payload }): DeltaCursor | null =>
      (payload.paginationState as DeltaCursor | undefined) ?? null,
  },
  perform: async (context, payload, { connection, driveId }) => {
    const { logger, polling, debug } = context;
    const client = await createClient(connection, debug.enabled);
    const state = polling.getState() as PollingState;
    const rootDelta = `/drives/${driveId}/root/delta`;
    const incoming = payload.paginationState as DeltaCursor | undefined;

    if (context.batch?.enabled === true) {
      const { page, next, cursorState } = await fetchDeltaRound(
        client,
        state,
        driveId,
        rootDelta,
        incoming,
      );
      const changes = separateDriveChanges(page.value);
      polling.setState(cursorState);

      return {
        payload: {
          ...payload,
          paginationState: next ?? undefined,
          body: { data: changes },
        },
        polledNoChanges: Object.keys(changes).length === 0 && next === null && !incoming,
      };
    }

    let allChanges: PollSiteChangesSeparatedChanges = {};

    const endpoint = resolveDeltaUrl(state, driveId, rootDelta);
    const data = (await paginateResults<DriveDeltaResponse>(client, endpoint, {
      returnFullData: true,
      useTop: false,
      excludeParents: true,
    })) as DriveDeltaResponse;

    const newPollingState: PollingState = {};

    if (data.value.length > 0) {
      allChanges = separateDriveChanges(data.value);
    }

    newPollingState[driveId] = data["@odata.deltaLink"];

    polling.setState(newPollingState);

    if (debug.enabled) {
      logger.debug("Polling state:", newPollingState);
    }

    return Promise.resolve({
      payload: { ...payload, body: { data: allChanges } },
      polledNoChanges: Object.keys(allChanges).length === 0 && !incoming,
    });
  },
});
