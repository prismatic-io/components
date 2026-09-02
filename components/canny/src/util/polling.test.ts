import { buildPost } from "../testHelpers";
import type { CannyPostChangesObject } from "../types";
import {
  classifyPostsByPollDate,
  collectPostChanges,
  resolvePostChanges,
} from "./polling";
const CURSOR = "2026-06-01T00:00:00.000Z";
const newPost = buildPost("new-1", "2026-06-02T00:00:00.000Z");
const updatedPost = buildPost(
  "updated-1",
  "2026-01-01T00:00:00.000Z",
  "2026-06-02T00:00:00.000Z",
);
const stalePost = buildPost(
  "stale-1",
  "2026-01-01T00:00:00.000Z",
  "2026-01-02T00:00:00.000Z",
);
describe("classifyPostsByPollDate", () => {
  test("splits posts into created and updated relative to the cursor", () => {
    const { created, updated } = classifyPostsByPollDate(
      [newPost, updatedPost, stalePost],
      CURSOR,
    );
    expect(created.map((p) => p.id)).toStrictEqual(["new-1"]);
    expect(updated.map((p) => p.id)).toStrictEqual(["updated-1"]);
  });
  test("counts a post as new when both dates moved, never as both", () => {
    const both = buildPost(
      "both-1",
      "2026-06-02T00:00:00.000Z",
      "2026-06-03T00:00:00.000Z",
    );
    const { created, updated } = classifyPostsByPollDate([both], CURSOR);
    expect(created.map((p) => p.id)).toStrictEqual(["both-1"]);
    expect(updated).toStrictEqual([]);
  });
  test("excludes a record sitting exactly on the cursor by default", () => {
    const onBoundary = buildPost("boundary-1", CURSOR, CURSOR);
    const { created, updated } = classifyPostsByPollDate([onBoundary], CURSOR);
    expect(created).toStrictEqual([]);
    expect(updated).toStrictEqual([]);
  });
  test("includes a record sitting exactly on the boundary when inclusive", () => {
    const onBoundary = buildPost("boundary-1", CURSOR, CURSOR);
    const { created, updated } = classifyPostsByPollDate(
      [onBoundary],
      CURSOR,
      true,
    );
    expect(created.map((p) => p.id)).toStrictEqual(["boundary-1"]);
    expect(updated).toStrictEqual([]);
  });
  test("includes an updated record on the boundary when inclusive", () => {
    const onBoundary = buildPost(
      "boundary-2",
      "2026-01-01T00:00:00.000Z",
      CURSOR,
    );
    const { created, updated } = classifyPostsByPollDate(
      [onBoundary],
      CURSOR,
      true,
    );
    expect(created).toStrictEqual([]);
    expect(updated.map((p) => p.id)).toStrictEqual(["boundary-2"]);
  });
  test("drops a post whose dates are missing or unparseable", () => {
    const undated = buildPost("undated-1", "", "");
    const garbage = buildPost("garbage-1", "not-a-date", "not-a-date");
    const { created, updated } = classifyPostsByPollDate(
      [undated, garbage],
      CURSOR,
    );
    expect(created).toStrictEqual([]);
    expect(updated).toStrictEqual([]);
  });
  test("returns empty groups for an empty post list", () => {
    expect(classifyPostsByPollDate([], CURSOR)).toStrictEqual({
      created: [],
      updated: [],
    });
  });
});
describe("collectPostChanges", () => {
  const posts = [newPost, updatedPost, stalePost];
  test("an initial sync ignores both visibility filters", () => {
    const { created, updated } = collectPostChanges(posts, CURSOR, {
      isInitialSync: true,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(created.map((p) => p.id)).toStrictEqual(["new-1"]);
    expect(updated.map((p) => p.id)).toStrictEqual(["updated-1"]);
  });
  test("a later recurrence honors Show New Records", () => {
    const { created, updated } = collectPostChanges(posts, CURSOR, {
      isInitialSync: false,
      showNewRecords: false,
      showUpdatedRecords: true,
    });
    expect(created).toStrictEqual([]);
    expect(updated.map((p) => p.id)).toStrictEqual(["updated-1"]);
  });
  test("a later recurrence honors Show Updated Records", () => {
    const { created, updated } = collectPostChanges(posts, CURSOR, {
      isInitialSync: false,
      showNewRecords: true,
      showUpdatedRecords: false,
    });
    expect(created.map((p) => p.id)).toStrictEqual(["new-1"]);
    expect(updated).toStrictEqual([]);
  });
  test("a later recurrence with both filters off emits nothing", () => {
    expect(
      collectPostChanges(posts, CURSOR, {
        isInitialSync: false,
        showNewRecords: false,
        showUpdatedRecords: false,
      }),
    ).toStrictEqual({ created: [], updated: [] });
  });
  test("an initial sync compares inclusively, a later recurrence does not", () => {
    const onBoundary = [buildPost("boundary-1", CURSOR, CURSOR)];
    expect(
      collectPostChanges(onBoundary, CURSOR, {
        isInitialSync: true,
        showNewRecords: true,
        showUpdatedRecords: true,
      }).created.map((p) => p.id),
    ).toStrictEqual(["boundary-1"]);
    expect(
      collectPostChanges(onBoundary, CURSOR, {
        isInitialSync: false,
        showNewRecords: true,
        showUpdatedRecords: true,
      }).created,
    ).toStrictEqual([]);
  });
});
describe("resolvePostChanges", () => {
  test("flattens a populated changes object into tagged items", () => {
    expect(
      resolvePostChanges({ created: [newPost], updated: [updatedPost] }),
    ).toStrictEqual([
      { changeType: "created", record: newPost },
      { changeType: "updated", record: updatedPost },
    ]);
  });
  test("preserves created-before-updated ordering", () => {
    const items = resolvePostChanges({
      created: [newPost, stalePost],
      updated: [updatedPost],
    });
    expect(items.map((item) => item.changeType)).toStrictEqual([
      "created",
      "created",
      "updated",
    ]);
  });
  test("returns an empty list for an all-empty changes object", () => {
    expect(resolvePostChanges({ created: [], updated: [] })).toStrictEqual([]);
  });
  test("returns an empty list for undefined", () => {
    expect(resolvePostChanges(undefined)).toStrictEqual([]);
  });
  test("tolerates a changes object whose arrays are absent at runtime", () => {
    expect(
      resolvePostChanges({} as unknown as CannyPostChangesObject),
    ).toStrictEqual([]);
  });
});
