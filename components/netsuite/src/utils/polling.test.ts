import { describe, expect, test } from "vitest";
import type { NetSuitePollingState } from "../types/PollingState";
import type { PollingTriggerObject } from "../types/PollingTriggerObject";
import { buildPollingQuery, getPollingChanges } from "./polling";
const NOW = "2026-01-10T00:00:00Z";
const LOOK_BACK = "2025-12-01T00:00:00Z";
const STORED_CURSOR = "2026-01-09T12:00:00Z";
describe("buildPollingQuery", () => {
  test("starts from the current poll time when there is no cursor and no Look-back Date", () => {
    expect(buildPollingQuery(undefined, {}, NOW)).toEqual({
      query: `lastmodifieddate AFTER ${NOW}`,
      lastPolledAt: NOW,
      isInitialSync: false,
    });
  });
  test("opens an inclusive initial sync window from the Look-back Date on the first poll", () => {
    expect(
      buildPollingQuery(undefined, { lookBackDate: LOOK_BACK }, NOW),
    ).toEqual({
      query: `lastmodifieddate ON_OR_AFTER ${LOOK_BACK}`,
      lastPolledAt: LOOK_BACK,
      isInitialSync: true,
    });
  });
  test("the stored cursor outranks the Look-back Date, so the backfill happens once", () => {
    const pollState: NetSuitePollingState = { lastPolledAt: STORED_CURSOR };
    expect(
      buildPollingQuery(pollState, { lookBackDate: LOOK_BACK }, NOW),
    ).toEqual({
      query: `lastmodifieddate AFTER ${STORED_CURSOR}`,
      lastPolledAt: STORED_CURSOR,
      isInitialSync: false,
    });
  });
  test("appends the additional filter on a normal poll", () => {
    const pollState: NetSuitePollingState = { lastPolledAt: STORED_CURSOR };
    expect(
      buildPollingQuery(
        pollState,
        { additionalFilter: "entitystatus = 13" },
        NOW,
      ).query,
    ).toBe(`lastmodifieddate AFTER ${STORED_CURSOR} AND entitystatus = 13`);
  });
  test("suppresses the additional filter during the initial sync", () => {
    expect(
      buildPollingQuery(
        undefined,
        { lookBackDate: LOOK_BACK, additionalFilter: "entitystatus = 13" },
        NOW,
      ),
    ).toEqual({
      query: `lastmodifieddate ON_OR_AFTER ${LOOK_BACK}`,
      lastPolledAt: LOOK_BACK,
      isInitialSync: true,
    });
  });
  test("an empty Look-back Date falls through to the current poll time and opens no initial sync", () => {
    expect(buildPollingQuery(undefined, { lookBackDate: "" }, NOW)).toEqual({
      query: `lastmodifieddate AFTER ${NOW}`,
      lastPolledAt: NOW,
      isInitialSync: false,
    });
  });
});
describe("getPollingChanges", () => {
  const cursor = new Date("2026-01-10T00:00:00Z");
  const createdThenEdited: PollingTriggerObject = {
    id: "1",
    datecreated: "2026-01-11T00:00:00Z",
    lastmodifieddate: "2026-01-12T00:00:00Z",
  };
  const createdUntouched: PollingTriggerObject = {
    id: "2",
    datecreated: "2026-01-11T00:00:00Z",
    lastmodifieddate: "2026-01-11T00:00:00Z",
  };
  const preexistingThenEdited: PollingTriggerObject = {
    id: "3",
    datecreated: "2025-06-01T00:00:00Z",
    lastmodifieddate: "2026-01-12T00:00:00Z",
  };
  test("classifies against the cursor, so a record created and edited in the window is created", () => {
    const { changesObject } = getPollingChanges(
      true,
      true,
      [createdThenEdited, createdUntouched, preexistingThenEdited],
      cursor,
    );
    expect(changesObject.createdRecords).toEqual([
      createdThenEdited,
      createdUntouched,
    ]);
    expect(changesObject.updatedRecords).toEqual([preexistingThenEdited]);
  });
  test("omits the createdRecords key entirely when new records are not shown", () => {
    const { changesObject, changes } = getPollingChanges(
      false,
      true,
      [createdThenEdited, preexistingThenEdited],
      cursor,
    );
    expect(changesObject).not.toHaveProperty("createdRecords");
    expect(changesObject.updatedRecords).toEqual([preexistingThenEdited]);
    expect(changes).toBe(1);
  });
  test("omits the updatedRecords key entirely when updated records are not shown", () => {
    const { changesObject, changes } = getPollingChanges(
      true,
      false,
      [createdThenEdited, preexistingThenEdited],
      cursor,
    );
    expect(changesObject).not.toHaveProperty("updatedRecords");
    expect(changesObject.createdRecords).toEqual([createdThenEdited]);
    expect(changes).toBe(1);
  });
  test("excludes a record last modified at or before the cursor", () => {
    const atCursor: PollingTriggerObject = {
      id: "4",
      datecreated: "2025-06-01T00:00:00Z",
      lastmodifieddate: "2026-01-10T00:00:00Z",
    };
    const beforeCursor: PollingTriggerObject = {
      id: "5",
      datecreated: "2025-06-01T00:00:00Z",
      lastmodifieddate: "2026-01-09T00:00:00Z",
    };
    const { changesObject, changes } = getPollingChanges(
      true,
      true,
      [atCursor, beforeCursor],
      cursor,
    );
    expect(changesObject).toEqual({ createdRecords: [], updatedRecords: [] });
    expect(changes).toBe(0);
  });
  test("counts one change per emitted record", () => {
    const { changesObject, changes } = getPollingChanges(
      true,
      true,
      [createdThenEdited, createdUntouched, preexistingThenEdited],
      cursor,
    );
    expect(changes).toBe(3);
    expect(
      (changesObject.createdRecords?.length ?? 0) +
        (changesObject.updatedRecords?.length ?? 0),
    ).toBe(changes);
  });
});
