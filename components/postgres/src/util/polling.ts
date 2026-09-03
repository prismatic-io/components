import { MAX_BATCHED_PAGE_SIZE, PAGE_SIZE } from "../constants";
import type {
  CursorValue,
  PageSplit,
  PollTableRow,
  ResolveStartCursorParams,
} from "../types";
export const sameCursor = (a: CursorValue, b: CursorValue): boolean =>
  a instanceof Date && b instanceof Date
    ? a.getTime() === b.getTime()
    : a === b;
export const cursorOf = (
  record: PollTableRow,
  cursorField: string,
): CursorValue => {
  const value = record[cursorField];
  if (value === null || value === undefined) {
    throw new Error(
      `Record is missing a usable "${cursorField}" value. The cursor field must be non-null on every row it orders.`,
    );
  }
  return value as CursorValue;
};
export const splitPage = (
  rows: PollTableRow[],
  cursorField: string,
  pageSize: number,
): PageSplit => {
  if (rows.length <= pageSize) {
    return { kind: "drained", emit: rows };
  }
  const page = rows.slice(0, pageSize);
  const lastValue = cursorOf(page[page.length - 1], cursorField);
  const lookaheadValue = cursorOf(rows[pageSize], cursorField);
  if (!sameCursor(lookaheadValue, lastValue)) {
    return { kind: "more", emit: page, nextCursor: lastValue };
  }
  const tieStart = page.findIndex((r) =>
    sameCursor(cursorOf(r, cursorField), lastValue),
  );
  if (tieStart === 0) {
    return { kind: "tie", tieValue: lastValue };
  }
  const emit = page.slice(0, tieStart);
  return {
    kind: "more",
    emit,
    nextCursor: cursorOf(emit[emit.length - 1], cursorField),
  };
};
export const resolveStartCursor = ({
  incoming,
  state,
  params,
}: ResolveStartCursorParams): CursorValue | null => {
  if (incoming !== undefined) {
    return incoming;
  }
  const hasPosition =
    state.cursor !== undefined || state.inFlightCursor !== undefined;
  const reconfigured =
    hasPosition &&
    (state.cursorField !== params.cursorField ||
      state.tableName !== params.tableName);
  if (reconfigured) {
    return null;
  }
  if (state.inFlightCursor !== undefined) {
    return state.inFlightCursor;
  }
  if (state.cursor !== undefined) {
    return state.cursor;
  }
  return params.defaultCursorValue || null;
};
export const resolvePageSize = (
  isBatching: boolean,
  maxRecordsPerRecurrence: number | undefined,
): number => {
  const requested = maxRecordsPerRecurrence ?? PAGE_SIZE;
  return isBatching ? Math.min(requested, MAX_BATCHED_PAGE_SIZE) : requested;
};
