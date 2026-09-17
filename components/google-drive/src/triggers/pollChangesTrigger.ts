import {
  type Connection,
  pollingTrigger,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { drive_v3 } from "googleapis";
import { listChanges } from "../actions/changes/listChanges";
import { createClient } from "../client";
import { CHANGE_LIST_KIND, DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { lookBackDate } from "../inputs";
import type {
  BackfillCursor,
  ChangesPaginationState,
  ChangesPollingState,
  ListChange,
  ListChangesResponse,
} from "../types";
import {
  fetchBackfillPage,
  fetchChangesPage,
  fetchStartPageToken,
  getInitialSyncCompletedKey,
  getListChangesLegacyStateKey,
  getListChangesNewStateKey,
  isInitialSyncCompleted,
  resolveListChangeItems,
  resolveListChangesPageToken,
} from "../util";
interface PollRound {
  data: ListChangesResponse | drive_v3.Schema$ChangeList;
  cursor?: string;
  nextState?: ChangesPaginationState;
  noChanges: boolean;
}
interface PollResult {
  payload: Omit<TriggerPayload, "body" | "paginationState"> & {
    body: {
      data: PollRound["data"];
      contentType?: string;
    };
    paginationState?: ChangesPaginationState;
  };
  crossFlowState?: Record<string, string>;
  instanceState?: Record<string, unknown>;
  polledNoChanges: boolean;
}
interface OnDeployParams {
  connection?: Connection;
  driveId?: unknown;
  lookBackDate?: string;
}
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Files",
    description:
      "Retrieves existing and ongoing files for a specified Google Drive, or all drives if omitted. Load history once, check for changes on a schedule, or both.",
  },
  pollAction: listChanges,
  inputs: { lookBackDate },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE, concurrentBatchLimit: 1 },
  triggerResolver: {
    resolveItems: (_context, { payload }): ListChange[] =>
      resolveListChangeItems(
        payload.body.data as ListChangesResponse | undefined,
      ),
    getNextPaginationState: (
      _context,
      { payload },
    ): ChangesPaginationState | null =>
      (payload.paginationState as ChangesPaginationState | undefined) ?? null,
  },
  onDeployPerform: async (context, payload, params): Promise<PollResult> => {
    const { connection, driveId, lookBackDate } = params as OnDeployParams;
    const stateKey = getListChangesNewStateKey(context);
    const incoming = payload.paginationState as
      | ChangesPaginationState
      | undefined;
    const scopedDriveId = util.types.toString(driveId);
    const nothingToDo = () => ({
      payload: {
        ...payload,
        paginationState: undefined as ChangesPaginationState | undefined,
        body: { data: { kind: CHANGE_LIST_KIND, changes: [] } },
      },
      polledNoChanges: true,
    });
    if (!incoming && isInitialSyncCompleted(context)) {
      return nothingToDo();
    }
    if (!lookBackDate || !connection) {
      return nothingToDo();
    }
    const client = createClient(connection);
    const backfill: BackfillCursor = incoming?.backfill ?? {
      modifiedAfter: lookBackDate,
      startPageToken: await fetchStartPageToken(client, scopedDriveId),
    };
    const { changes, nextPageToken } = await fetchBackfillPage(client, {
      modifiedAfter: backfill.modifiedAfter,
      driveId: scopedDriveId,
      pageToken: incoming?.pageToken,
    });
    const done = !nextPageToken;
    return {
      payload: {
        ...payload,
        paginationState: done
          ? undefined
          : ({
              pageToken: nextPageToken as string,
              backfill,
            } as ChangesPaginationState),
        body: {
          data: {
            kind: CHANGE_LIST_KIND,
            changes,
            ...(done
              ? { newStartPageToken: backfill.startPageToken }
              : { nextPageToken }),
          },
        },
      },
      ...(done
        ? {
            crossFlowState: { [stateKey]: backfill.startPageToken },
            instanceState: {
              ...context.instanceState,
              [getInitialSyncCompletedKey(context)]: true,
            },
          }
        : {}),
      polledNoChanges: changes.length === 0 && done,
    };
  },
  onDeployResolver: {
    resolveItems: (_context, { payload }): ListChange[] =>
      resolveListChangeItems(
        payload.body.data as ListChangesResponse | undefined,
      ),
    getNextPaginationState: (
      _context,
      { payload },
    ): ChangesPaginationState | null =>
      (payload.paginationState as ChangesPaginationState | undefined) ?? null,
  },
  perform: async (context, payload, params): Promise<PollResult> => {
    const client = createClient(params.connection);
    const stateKey = getListChangesNewStateKey(context);
    const incoming = payload.paginationState as
      | ChangesPaginationState
      | undefined;
    const state = context.polling.getState() as ChangesPollingState;
    const isPlatformDrivenRound = Boolean(incoming);
    const isBatching = context.batch?.enabled === true;
    const { value: storedToken, isLegacy } =
      resolveListChangesPageToken(context);
    const backfillRound = async (
      backfill: BackfillCursor,
      pageToken?: string,
    ): Promise<PollRound> => {
      const { changes, nextPageToken } = await fetchBackfillPage(client, {
        modifiedAfter: backfill.modifiedAfter,
        driveId: params.driveId,
        pageToken,
      });
      const done = !nextPageToken;
      context.polling.setState(
        done
          ? {}
          : ({
              backfill,
              backfillPageToken: nextPageToken,
            } satisfies ChangesPollingState),
      );
      return {
        data: {
          kind: CHANGE_LIST_KIND,
          changes,
          ...(done
            ? { newStartPageToken: backfill.startPageToken }
            : { nextPageToken }),
        },
        cursor: done ? backfill.startPageToken : undefined,
        nextState: done
          ? undefined
          : { pageToken: nextPageToken as string, backfill },
        noChanges: changes.length === 0 && done,
      };
    };
    const changesRound = async (pageToken: string): Promise<PollRound> => {
      const data = await fetchChangesPage(client, {
        pageToken,
        driveId: params.driveId,
      });
      const moreToRead = Boolean(data.nextPageToken);
      return {
        data,
        cursor: moreToRead
          ? isBatching
            ? pageToken
            : (data.nextPageToken as string)
          : (data.newStartPageToken as string),
        nextState: moreToRead
          ? { pageToken: data.nextPageToken as string }
          : undefined,
        noChanges: (data.changes?.length ?? 0) === 0 && !moreToRead,
      };
    };
    const firstRun = async (): Promise<PollRound> => {
      const startPageToken = await fetchStartPageToken(client, params.driveId);
      if (params.lookBackDate) {
        return await backfillRound({
          modifiedAfter: params.lookBackDate,
          startPageToken: startPageToken as string,
        });
      }
      context.logger.info(
        "First time running. Subsequent runs will show changes that occurred since the previous run.",
      );
      return {
        data: {
          kind: CHANGE_LIST_KIND,
          newStartPageToken: startPageToken,
          changes: [],
        },
        cursor: startPageToken as string,
        noChanges: true,
      };
    };
    const round = incoming
      ? incoming.backfill
        ? await backfillRound(incoming.backfill, incoming.pageToken)
        : await changesRound(incoming.pageToken)
      : state.backfill
        ? await backfillRound(state.backfill, state.backfillPageToken)
        : storedToken
          ? await changesRound(storedToken)
          : await firstRun();
    const cursorWrite: {
      crossFlowState?: Record<string, string>;
    } = round.cursor ? { crossFlowState: { [stateKey]: round.cursor } } : {};
    const legacyCleanup: {
      instanceState?: Record<string, unknown>;
    } = isLegacy
      ? {
          instanceState: {
            ...context.instanceState,
            [getListChangesLegacyStateKey(context)]: null,
          },
        }
      : {};
    return {
      payload: {
        ...payload,
        paginationState: round.nextState,
        body: { data: round.data },
      },
      ...cursorWrite,
      ...legacyCleanup,
      polledNoChanges: round.noChanges && !isPlatformDrivenRound,
    };
  },
  examplePayload: { ...pollChangesTriggerExamplePayload },
});
