import { describe, expect, test } from "vitest";
import type { SystemLogEvent } from "../interfaces/polling";
import type { User } from "../interfaces/user";
import {
  getNextLinkUrl,
  resolveSystemLogChanges,
  resolveUserChanges,
  systemLogsWindowBounds,
} from "./polling";

const user = { id: "00u1" } as User;

describe("resolveUserChanges", () => {
  test("tags every user with the given change type", () => {
    expect(resolveUserChanges("created", [user])).toEqual([
      { changeType: "created", record: user },
    ]);
    expect(resolveUserChanges("updated", [user])).toEqual([
      { changeType: "updated", record: user },
    ]);
  });

  test("tolerates an absent or empty array", () => {
    expect(resolveUserChanges("created", undefined)).toEqual([]);
    expect(resolveUserChanges("created", [])).toEqual([]);
  });
});

describe("resolveSystemLogChanges", () => {
  const event: SystemLogEvent = {
    uuid: "e1",
    published: "2026-10-01T00:00:00.000Z",
    eventType: "user.session.start",
  };

  test("tags every event as created", () => {
    expect(resolveSystemLogChanges([event])).toEqual([
      { changeType: "created", record: event },
    ]);
  });

  test("tolerates an absent or empty array", () => {
    expect(resolveSystemLogChanges(undefined)).toEqual([]);
    expect(resolveSystemLogChanges([])).toEqual([]);
  });
});

describe("getNextLinkUrl", () => {
  const self = '<https://example.okta.com/api/v1/logs?limit=50>; rel="self"';
  const next =
    '<https://example.okta.com/api/v1/logs?after=abc,def&limit=50>; rel="next"';

  test("reads rel=next from a joined header, URLs containing commas included", () => {
    expect(getNextLinkUrl(`${self}, ${next}`)).toBe(
      "https://example.okta.com/api/v1/logs?after=abc,def&limit=50",
    );
  });

  test("reads rel=next from a header array", () => {
    expect(getNextLinkUrl([self, next])).toContain("after=abc,def");
  });

  test("returns undefined when there is no next link", () => {
    expect(getNextLinkUrl(self)).toBeUndefined();
    expect(getNextLinkUrl(undefined)).toBeUndefined();
  });
});

describe("systemLogsWindowBounds", () => {
  test("batched rounds read one small page", () => {
    expect(systemLogsWindowBounds(true)).toEqual({ pageSize: 50, maxPages: 1 });
  });

  test("an unbatched recurrence keeps the full-size page and the page budget", () => {
    expect(systemLogsWindowBounds(false)).toEqual({
      pageSize: 1000,
      maxPages: 20,
    });
  });
});
