import type { ActionLogger } from "@prismatic-io/spectral";
import {
  BATCHED_CHANGE_EVENT_ROW_LIMIT,
  CHANGE_EVENT_ROW_LIMIT,
} from "../../constants";
import type {
  ChangeEventCursor,
  ChangeEventIdentity,
  ChangeEventPollingState,
} from "../../types";
import { clampToChangeEventWindow } from "./dateUtils";
const toGAQLSecond = (changeDateTime: string): string =>
  changeDateTime.slice(0, 19);
const nextGAQLSecond = (dateTime: string): string =>
  new Date(Date.parse(`${dateTime.replace(" ", "T")}Z`) + 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
const isChangeEventCursor = (value: unknown): value is ChangeEventCursor => {
  const cursor = value as ChangeEventCursor | undefined;
  return (
    typeof cursor?.sinceTime === "string" &&
    typeof cursor.toTime === "string" &&
    Array.isArray(cursor.boundaryResourceNames)
  );
};
export const resolveChangeEventPageSize = (batchEnabled?: boolean): number =>
  batchEnabled === true
    ? BATCHED_CHANGE_EVENT_ROW_LIMIT
    : CHANGE_EVENT_ROW_LIMIT;
export const resolveChangeEventCursor = (options: {
  incoming?: ChangeEventCursor;
  state: Pick<ChangeEventPollingState, "lastChangeTime" | "inFlightCursor">;
  nowTime: string;
  timeZone: string;
}): ChangeEventCursor => {
  const { incoming, state, nowTime, timeZone } = options;
  const resumed = [incoming, state.inFlightCursor].find(isChangeEventCursor);
  const cursor = resumed ?? {
    sinceTime: state.lastChangeTime,
    toTime: nowTime,
    boundaryResourceNames: [],
  };
  return {
    ...cursor,
    sinceTime: clampToChangeEventWindow(cursor.sinceTime, timeZone),
  };
};
export const advanceChangeEventCursor = <T extends ChangeEventIdentity>(
  rows: T[],
  cursor: ChangeEventCursor,
  pageSize: number,
  logger?: Pick<ActionLogger, "warn">,
): {
  emit: T[];
  nextCursor: ChangeEventCursor | null;
} => {
  const alreadyEmitted = new Set(cursor.boundaryResourceNames);
  const emit = rows.filter(
    (row) => !alreadyEmitted.has(row.changeEvent?.resourceName ?? ""),
  );
  if (rows.length < pageSize) {
    return { emit, nextCursor: null };
  }
  const seconds = rows.map((row) =>
    toGAQLSecond(row.changeEvent?.changeDateTime ?? cursor.sinceTime),
  );
  const newestSecond = seconds.reduce((max, s) => (s > max ? s : max));
  if (emit.length === 0) {
    logger?.warn(
      `More than ${pageSize} change events share ${newestSecond}; skipping to the next second.`,
    );
    const sinceTime = nextGAQLSecond(newestSecond);
    return {
      emit,
      nextCursor:
        sinceTime < cursor.toTime
          ? { ...cursor, sinceTime, boundaryResourceNames: [] }
          : null,
    };
  }
  const atNewestSecond = rows
    .filter((_row, index) => seconds[index] === newestSecond)
    .map((row) => row.changeEvent?.resourceName ?? "")
    .filter((name) => name !== "");
  const carried =
    newestSecond === cursor.sinceTime ? cursor.boundaryResourceNames : [];
  return {
    emit,
    nextCursor: {
      ...cursor,
      sinceTime: newestSecond,
      boundaryResourceNames: [...new Set([...carried, ...atNewestSecond])],
    },
  };
};
