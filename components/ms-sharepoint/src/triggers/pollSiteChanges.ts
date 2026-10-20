import { pollingTrigger } from "@prismatic-io/spectral";
import { connection, siteId } from "../inputs";
import { createClient } from "../client";
import {
  fetchSiteDeltaRound,
  paginateResults,
  resolveDeltaUrl,
  resolveSitePollingRecordChanges,
  separateDriveChanges,
} from "../utils";
import type {
  Drive,
  DriveDeltaResponse,
  PollingState,
  PollingRecordChange,
  PollSiteChangesResult,
  SiteDeltaCursor,
} from "../interfaces";
export const pollSiteChanges = pollingTrigger({
  display: {
    label: "New and Updated Site Items",
    description:
      "Checks for new and updated items across all drives in a SharePoint site on a configured schedule.",
  },
  inputs: {
    connection,
    siteId,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolveSitePollingRecordChanges(
        payload.body.data as PollSiteChangesResult,
      ),
    getNextPaginationState: (_context, { payload }): SiteDeltaCursor | null =>
      (payload.paginationState as SiteDeltaCursor | undefined) ?? null,
  },
  perform: async (context, payload, { connection, siteId }) => {
    const { logger, polling, debug } = context;
    const client = await createClient(connection, debug.enabled);
    const state = polling.getState() as PollingState;
    const rootDeltaFor = (driveId: string) =>
      `/sites/${siteId}/drives/${driveId}/root/delta`;
    const drivesEndpoint = `/sites/${siteId}/drives?$select=id,name`;
    const allDrives = (await paginateResults(
      client,
      drivesEndpoint,
    )) as Drive[];
    if (context.batch?.enabled === true) {
      const incoming = payload.paginationState as SiteDeltaCursor | undefined;
      const { changes, next, newPollingState } = await fetchSiteDeltaRound(
        client,
        state,
        rootDeltaFor,
        allDrives,
        incoming,
      );
      polling.setState(newPollingState);
      return {
        payload: {
          ...payload,
          paginationState: next ?? undefined,
          body: { data: changes },
        },
        polledNoChanges:
          Object.keys(changes).length === 0 && next === null && !incoming,
      };
    }
    let polledNoChanges = true;
    const allChanges: Record<string, unknown> = {};
    for (const drive of allDrives) {
      const endpoint = resolveDeltaUrl(state, drive.id, rootDeltaFor(drive.id));
      allChanges[drive.name] = paginateResults(client, endpoint, {
        returnFullData: true,
        useTop: false,
        excludeParents: true,
      });
    }
    const allChangesResults = (await Promise.all(
      Object.values(allChanges),
    )) as DriveDeltaResponse[];
    const newPollingState: PollingState = {};
    allChangesResults.forEach((result, index) => {
      if (result.value.length > 0) {
        allChanges[allDrives[index].name] = separateDriveChanges(result.value);
        if (polledNoChanges === true) {
          polledNoChanges = false;
        }
      } else {
        delete allChanges[allDrives[index].name];
      }
      newPollingState[allDrives[index].id] = result["@odata.deltaLink"];
    });
    polling.setState(newPollingState);
    if (debug.enabled) {
      logger.debug("Polling state:", newPollingState);
    }
    return Promise.resolve({
      payload: { ...payload, body: { data: allChanges } },
      polledNoChanges,
    });
  },
});
