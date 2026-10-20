import { pollingTrigger } from "@prismatic-io/spectral";
import { connection, driveId, siteId } from "../inputs";
import { createClient } from "../client";
import {
  fetchDeltaRound,
  paginateResults,
  resolveDeltaUrl,
  resolvePollingRecordChanges,
  separateDriveChanges,
} from "../utils";
import type {
  DeltaCursor,
  DriveDeltaResponse,
  PollingState,
  PollingRecordChange,
  PollSiteChangesSeparatedChanges,
} from "../interfaces";
export const drivePollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Drive Items",
    description:
      "Checks for new and updated items in a specified SharePoint drive on a configured schedule.",
  },
  inputs: {
    connection,
    siteId: { ...siteId, required: false },
    driveId,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(
        payload.body.data as PollSiteChangesSeparatedChanges,
      ),
    getNextPaginationState: (_context, { payload }): DeltaCursor | null =>
      (payload.paginationState as DeltaCursor | undefined) ?? null,
  },
  perform: async (context, payload, { connection, driveId }) => {
    const { logger, polling, debug } = context;
    const client = await createClient(connection, debug.enabled);
    const state = polling.getState() as PollingState;
    const rootDelta = `/drives/${driveId}/root/delta`;
    if (context.batch?.enabled === true) {
      const { page, next, cursorState } = await fetchDeltaRound(
        client,
        state,
        driveId,
        rootDelta,
        payload.paginationState as DeltaCursor | undefined,
      );
      polling.setState(cursorState);
      return {
        payload: {
          ...payload,
          paginationState: next ?? undefined,
          body: { data: separateDriveChanges(page.value) },
        },
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
    });
  },
});
