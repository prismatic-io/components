import { pollingTrigger } from "@prismatic-io/spectral";
import { folderPollingTriggerInputs } from "../inputs";
import { createClient } from "../client";
import {
  fetchDeltaRound,
  folderMatcher,
  folderPathFrom,
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
export const folderPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Folder Items",
    description:
      "Checks for new and updated items in a specified folder within a SharePoint drive on a configured schedule.",
  },
  inputs: folderPollingTriggerInputs,
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
  perform: async (
    context,
    payload,
    { connection, driveId, folderId, includeSubfolders },
  ) => {
    const { logger, polling, debug } = context;
    const client = await createClient(connection, debug.enabled);
    const stateKey = `${driveId}:${folderId}`;
    const pathKey = `${stateKey}:path`;
    const state = polling.getState() as PollingState;
    const rootDelta = `/drives/${driveId}/root/delta`;
    let folderPath = state[pathKey] as string | undefined;
    if (context.batch?.enabled === true) {
      const { page, next, cursorState } = await fetchDeltaRound(
        client,
        state,
        stateKey,
        rootDelta,
        payload.paginationState as DeltaCursor | undefined,
      );
      folderPath = folderPathFrom(page.value, folderId, folderPath);
      polling.setState({
        ...cursorState,
        ...(folderPath ? { [pathKey]: folderPath } : {}),
      });
      return {
        payload: {
          ...payload,
          paginationState: next ?? undefined,
          body: {
            data: separateDriveChanges(
              page.value,
              folderMatcher(folderId, includeSubfolders, folderPath),
            ),
          },
        },
      };
    }
    let allChanges: PollSiteChangesSeparatedChanges = {};
    const endpoint = resolveDeltaUrl(state, stateKey, rootDelta);
    const data = (await paginateResults(client, endpoint, {
      returnFullData: true,
      useTop: false,
      excludeParents: true,
    })) as unknown as DriveDeltaResponse;
    const newPollingState: PollingState = {};
    if (data.value.length > 0) {
      folderPath = folderPathFrom(data.value, folderId, folderPath);
      allChanges = separateDriveChanges(
        data.value,
        folderMatcher(folderId, includeSubfolders, folderPath),
      );
    }
    if (folderPath) {
      newPollingState[pathKey] = folderPath;
    }
    newPollingState[stateKey] = data["@odata.deltaLink"];
    polling.setState(newPollingState);
    if (debug.enabled) {
      logger.debug("Polling state:", newPollingState);
    }
    return Promise.resolve({
      payload: { ...payload, body: { data: allChanges } },
    });
  },
});
