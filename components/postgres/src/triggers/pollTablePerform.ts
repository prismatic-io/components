import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { createDB } from "../client";
import type { pollTableInputs } from "../inputs";
import { MAX_CURSOR_QUERY, PAGE_QUERY, REMAINDER_QUERY } from "../queries";
import type {
  CursorValue,
  PaginationState,
  PollingState,
  PollTableRow,
} from "../types";
import {
  cursorOf,
  resolvePageSize,
  resolveStartCursor,
  splitPage,
} from "../util";
interface FetchPageParams {
  tableName: string;
  cursorField: string;
  cursor: CursorValue;
  pageSize: number;
}
interface Page {
  emit: PollTableRow[];
  nextCursor: CursorValue | null;
}
type Queryable = {
  manyOrNone: (query: string, values: unknown) => Promise<PollTableRow[]>;
  one: (
    query: string,
    values: unknown,
  ) => Promise<{
    cursor: CursorValue;
  }>;
};
export const fetchPage = async (
  db: Queryable,
  { tableName, cursorField, cursor, pageSize }: FetchPageParams,
): Promise<Page> => {
  const rows = await db.manyOrNone(PAGE_QUERY, {
    table: tableName,
    cursorField,
    cursor,
    limit: pageSize + 1,
  });
  const split = splitPage(rows, cursorField, pageSize);
  if (split.kind === "drained") {
    return { emit: split.emit, nextCursor: null };
  }
  if (split.kind === "more") {
    return { emit: split.emit, nextCursor: split.nextCursor };
  }
  const remainder = await db.manyOrNone(REMAINDER_QUERY, {
    table: tableName,
    cursorField,
    cursor,
  });
  return { emit: remainder, nextCursor: null };
};
export const pollTablePerform = async (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof pollTableInputs>,
) => {
  const db = createDB({
    connection: params.postgresConnection,
    castTimestampsToString: params.castTimestampsToString,
  });
  try {
    const state = context.polling.getState() as PollingState;
    const incoming = (payload.paginationState as PaginationState | undefined)
      ?.cursor;
    const isPlatformDrivenRound = incoming !== undefined;
    const start = resolveStartCursor({ incoming, state, params });
    if (start === null) {
      const { cursor } = await db.one(MAX_CURSOR_QUERY, {
        cursorField: params.cursorField,
        table: params.tableName,
      });
      context.polling.setState({
        cursor,
        cursorField: params.cursorField,
        tableName: params.tableName,
      } satisfies PollingState);
      context.logger.log(
        `First time running. Next time records with "${params.cursorField}" greater than "${cursor}" will be fetched.`,
      );
      return {
        payload: { ...payload, body: { data: [] }, paginationState: undefined },
        polledNoChanges: !isPlatformDrivenRound,
      };
    }
    const { emit, nextCursor } = await fetchPage(db, {
      tableName: params.tableName,
      cursorField: params.cursorField,
      cursor: start,
      pageSize: resolvePageSize(
        context.batch?.enabled === true,
        params.maxRecordsPerRecurrence,
      ),
    });
    context.polling.setState(
      nextCursor === null
        ? ({
            cursor:
              emit.length > 0
                ? cursorOf(emit[emit.length - 1], params.cursorField)
                : (state.cursor ?? start),
            cursorField: params.cursorField,
            tableName: params.tableName,
          } satisfies PollingState)
        : ({
            cursor: state.cursor ?? start,
            cursorField: params.cursorField,
            tableName: params.tableName,
            inFlightCursor: nextCursor,
          } satisfies PollingState),
    );
    return {
      payload: {
        ...payload,
        body: { data: emit },
        paginationState:
          nextCursor === null ? undefined : { cursor: nextCursor },
      },
      polledNoChanges:
        emit.length === 0 && nextCursor === null && !isPlatformDrivenRound,
    };
  } finally {
    await db.$pool.end();
  }
};
