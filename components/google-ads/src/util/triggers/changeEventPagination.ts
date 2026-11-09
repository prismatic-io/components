import type { ActionLogger } from "@prismatic-io/spectral";
import {
  BATCHED_CHANGE_EVENT_ROW_LIMIT,
  CHANGE_EVENT_MAX_WINDOW_DAYS,
  CHANGE_EVENT_ROW_LIMIT,
} from "../../constants";
import type {
  ChangeEventCursor,
  ChangeEventIdentity,
  ChangeEventPollingState,
  ChangeRowIdentity,
} from "../../types";
import { clampToChangeEventWindow } from "./dateUtils";

const toGAQLSecond = (changeDateTime: string): string =>
  changeDateTime.slice(0, 19);

const nextGAQLSecond = (dateTime: string): string =>
  new Date(Date.parse(`${dateTime.replace(" ", "T")}Z`) + 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

export const changeEventRowIdentity = (
  row: ChangeEventIdentity,
): ChangeRowIdentity => ({
  resourceName: row.changeEvent?.resourceName,
  changeDateTime: row.changeEvent?.changeDateTime,
});

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
  windowDays?: number;
}): ChangeEventCursor => {
  const {
    incoming,
    state,
    nowTime,
    timeZone,
    windowDays = CHANGE_EVENT_MAX_WINDOW_DAYS,
  } = options;
  const resumed = [incoming, state.inFlightCursor].find(isChangeEventCursor);
  const cursor = resumed ?? {
    sinceTime: state.lastChangeTime,
    toTime: nowTime,
    boundaryResourceNames: [],
  };

  return {
    ...cursor,
    sinceTime: clampToChangeEventWindow(cursor.sinceTime, timeZone, windowDays),
  };
};

export const advanceChangeEventCursor = <T>(
  rows: T[],
  cursor: ChangeEventCursor,
  pageSize: number,
  identify: (row: T) => ChangeRowIdentity,
  logger?: Pick<ActionLogger, "warn">,
): { emit: T[]; nextCursor: ChangeEventCursor | null } => {
  const alreadyEmitted = new Set(cursor.boundaryResourceNames);
  const emit = rows.filter((row) => {
    const { resourceName } = identify(row);
    return resourceName === undefined || !alreadyEmitted.has(resourceName);
  });

  if (rows.length < pageSize) {
    return { emit, nextCursor: null };
  }

  const seconds = rows.map((row) => {
    const { changeDateTime } = identify(row);
    return toGAQLSecond(
      changeDateTime === undefined ? cursor.sinceTime : changeDateTime,
    );
  });
  const newestSecond = seconds.reduce((max, s) => (s > max ? s : max));

  if (emit.length === 0) {
    logger?.warn(
      `More than ${pageSize} changes share ${newestSecond}; skipping to the next second.`,
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
    .map((row) => identify(row).resourceName)
    .filter((name): name is string => name !== undefined && name !== "");
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
