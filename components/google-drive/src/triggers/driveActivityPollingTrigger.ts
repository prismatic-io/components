import { pollingTrigger, type TriggerPayload } from "@prismatic-io/spectral";
import type { driveactivity_v2 } from "googleapis";
import { createActivityClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { driveActivityPollingTriggerExamplePayload } from "../examplePayloads";
import {
  ancestorName,
  connection,
  consolidationStrategy,
  itemName,
  lookBackDate,
  triggerEvents,
} from "../inputs";
import type {
  ActivityPaginationState,
  SearchRecordsPollingState,
} from "../types";
import {
  buildActivityFilter,
  cleanItemInput,
  getActivitySyncHandoffKey,
  getInitialSyncCompletedKey,
  getQueryDriveActivity,
  isInitialSyncCompleted,
  resolveActivitySyncHandoff,
  resolveDriveActivities,
} from "../util";
interface ActivityResult {
  payload: Omit<TriggerPayload, "body" | "paginationState"> & {
    body: {
      data: driveactivity_v2.Schema$DriveActivity[];
      contentType?: string;
    };
    paginationState?: ActivityPaginationState;
  };
  instanceState?: Record<string, unknown>;
  polledNoChanges: boolean;
}
export const driveActivityPollingTrigger = pollingTrigger({
  display: {
    label: "Drive Activity",
    description:
      "Retrieves existing and ongoing Google Drive activity. Load history once, check for activity on a schedule, or both. By default yields activity on personal 'My Drive'. For activity on a shared drive, specify a shared drive's folder's 'Folder ID'.",
  },
  inputs: {
    triggerEvents,
    itemName,
    ancestorName: {
      ...ancestorName,
      comments:
        "Return activities for this Drive or folder, plus all children and descendants. You may supply an array of drive or folder IDs.",
      clean: (value) =>
        (Array.isArray(value) ? value : [value]).map(cleanItemInput),
    },
    consolidationStrategy,
    lookBackDate,
    connection,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE, concurrentBatchLimit: 1 },
  triggerResolver: {
    resolveItems: (
      _context,
      { payload },
    ): driveactivity_v2.Schema$DriveActivity[] =>
      resolveDriveActivities(
        payload.body.data as
          | driveactivity_v2.Schema$DriveActivity[]
          | undefined,
      ),
    getNextPaginationState: (
      _context,
      { payload },
    ): ActivityPaginationState | null =>
      (payload.paginationState as ActivityPaginationState | undefined) ?? null,
  },
  onDeployPerform: async (
    context,
    payload,
    {
      triggerEvents,
      connection,
      ancestorName: ancestors,
      lookBackDate,
      ...params
    },
  ): Promise<ActivityResult> => {
    const incoming = payload.paginationState as
      | ActivityPaginationState
      | undefined;
    const nothingToDo = (): ActivityResult => ({
      payload: { ...payload, paginationState: undefined, body: { data: [] } },
      polledNoChanges: true,
    });
    if (!incoming && isInitialSyncCompleted(context)) {
      return nothingToDo();
    }
    if (!lookBackDate) {
      return nothingToDo();
    }
    const windowStart = incoming?.windowStart || lookBackDate;
    const cycleEnd = incoming?.cycleEnd ?? new Date().toISOString();
    const filter = buildActivityFilter(windowStart, triggerEvents);
    const drive = createActivityClient(connection);
    const ancestorIndex = incoming?.ancestorIndex ?? 0;
    const actionReturn = await getQueryDriveActivity(
      drive,
      {
        ...params,
        ancestorName: ancestors[ancestorIndex],
        filter,
        pageToken: incoming?.pageToken,
      },
      false,
    );
    const activities = actionReturn.activities || [];
    const nextState: ActivityPaginationState | undefined =
      actionReturn.nextPageToken
        ? {
            ancestorIndex,
            pageToken: actionReturn.nextPageToken,
            windowStart,
            cycleEnd,
          }
        : ancestorIndex + 1 < ancestors.length
          ? { ancestorIndex: ancestorIndex + 1, windowStart, cycleEnd }
          : undefined;
    return {
      payload: {
        ...payload,
        paginationState: nextState ?? undefined,
        body: { data: activities },
      },
      ...(nextState
        ? {}
        : {
            instanceState: {
              ...context.instanceState,
              [getActivitySyncHandoffKey(context)]: cycleEnd,
              [getInitialSyncCompletedKey(context)]: true,
            },
          }),
      polledNoChanges: activities.length === 0 && !nextState,
    };
  },
  onDeployResolver: {
    resolveItems: (
      _context,
      { payload },
    ): driveactivity_v2.Schema$DriveActivity[] =>
      resolveDriveActivities(
        payload.body.data as
          | driveactivity_v2.Schema$DriveActivity[]
          | undefined,
      ),
    getNextPaginationState: (
      _context,
      { payload },
    ): ActivityPaginationState | null =>
      (payload.paginationState as ActivityPaginationState | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    {
      triggerEvents,
      connection,
      ancestorName: ancestors,
      lookBackDate,
      ...params
    },
  ): Promise<ActivityResult> => {
    const pollState = context.polling.getState() as SearchRecordsPollingState;
    const incoming = payload.paginationState as
      | ActivityPaginationState
      | undefined;
    const isBatching = context.batch?.enabled === true;
    const isPlatformDrivenRound = Boolean(incoming);
    const handoff = resolveActivitySyncHandoff(context);
    const windowStart =
      incoming?.windowStart ||
      pollState.lastPolledAt ||
      handoff ||
      lookBackDate ||
      new Date().toISOString();
    const cycleEnd = incoming?.cycleEnd ?? new Date().toISOString();
    const filter = buildActivityFilter(windowStart, triggerEvents);
    const drive = createActivityClient(connection);
    const handoffCleanup: {
      instanceState?: Record<string, unknown>;
    } = handoff
      ? {
          instanceState: {
            ...context.instanceState,
            [getActivitySyncHandoffKey(context)]: null,
          },
        }
      : {};
    if (!isBatching) {
      const searchRecords: driveactivity_v2.Schema$DriveActivity[] = [];
      for (const ancestor of ancestors) {
        const actionReturn = await getQueryDriveActivity(
          drive,
          { ...params, ancestorName: ancestor, filter },
          true,
        );
        searchRecords.push(...(actionReturn.activities || []));
      }
      context.polling.setState({ lastPolledAt: cycleEnd });
      return {
        payload: {
          ...payload,
          paginationState: undefined,
          body: { data: searchRecords },
        },
        ...handoffCleanup,
        polledNoChanges: searchRecords.length === 0,
      };
    }
    const ancestorIndex = incoming?.ancestorIndex ?? 0;
    const actionReturn = await getQueryDriveActivity(
      drive,
      {
        ...params,
        ancestorName: ancestors[ancestorIndex],
        filter,
        pageToken: incoming?.pageToken,
      },
      false,
    );
    const activities = actionReturn.activities || [];
    const nextState: ActivityPaginationState | undefined =
      actionReturn.nextPageToken
        ? {
            ancestorIndex,
            pageToken: actionReturn.nextPageToken,
            windowStart,
            cycleEnd,
          }
        : ancestorIndex + 1 < ancestors.length
          ? { ancestorIndex: ancestorIndex + 1, windowStart, cycleEnd }
          : undefined;
    if (!nextState) {
      context.polling.setState({ lastPolledAt: cycleEnd });
    }
    return {
      payload: {
        ...payload,
        paginationState: nextState ?? undefined,
        body: { data: activities },
      },
      ...(nextState ? {} : handoffCleanup),
      polledNoChanges:
        activities.length === 0 && !nextState && !isPlatformDrivenRound,
    };
  },
  examplePayload: { ...driveActivityPollingTriggerExamplePayload },
});
