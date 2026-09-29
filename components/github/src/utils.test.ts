import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createClient } from "./client";
import { oauth2 } from "./connections";
import type { GithubIssueRecord } from "./interfaces/PollingState";
import {
  cleanString,
  fetchIssuesSince,
  floorToSecond,
  lookBackDateClean,
  nextPollingState,
  paginateResults,
  splitIssueChanges,
  toOptionalNumber,
} from "./utils";
describe("cleanString", () => {
  test("returns the trimmed string for a valid value", () => {
    expect(cleanString("octocat")).toBe("octocat");
  });
  test("returns undefined for an empty string", () => {
    expect(cleanString("")).toBeUndefined();
  });
  test("returns undefined for undefined", () => {
    expect(cleanString(undefined)).toBeUndefined();
  });
});
describe("toOptionalNumber", () => {
  test("parses a numeric string to a number", () => {
    expect(toOptionalNumber("5")).toBe(5);
  });
  test("returns undefined for an empty string", () => {
    expect(toOptionalNumber("")).toBeUndefined();
  });
  test("returns undefined for '0' because of the || undefined coalesce", () => {
    expect(toOptionalNumber("0")).toBeUndefined();
  });
});
describe("lookBackDateClean", () => {
  test("returns '' for an empty string", () => {
    expect(lookBackDateClean("")).toBe("");
  });
  test("returns '' for undefined", () => {
    expect(lookBackDateClean(undefined)).toBe("");
  });
  test("returns an ISO timestamp for a valid YYYY-MM-DD date", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("throws on a non-YYYY-MM-DD string", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      /Look-back Date must be a date in YYYY-MM-DD format/,
    );
  });
  test("throws on a non-calendar date such as 2026-02-31", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      /Look-back Date must be a date in YYYY-MM-DD format/,
    );
  });
  test("throws on a future date, mentioning the label", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
describe("paginateResults maxRecords", () => {
  const BASE = "https://api.github.com";
  const client = createClient(
    createConnection(oauth2, {}, { access_token: "t" }),
    false,
  );
  const page = (from: number) =>
    Array.from({ length: 100 }, (_, i) => ({ id: from + i }));
  const next = (n: number) => ({
    link: `<${BASE}/x?page=${n}>; rel="next"`,
  });
  afterEach(() => nock.cleanAll());
  test("stops requesting pages once maxRecords is reached and trims to it", async () => {
    let requests = 0;
    nock(BASE)
      .get("/x")
      .query(() => {
        requests += 1;
        return true;
      })
      .times(4)
      .reply(200, () => page(requests * 100), next(99));
    const out = await paginateResults<{
      id: number;
    }>(client, "/x", true, {}, 250);
    expect(requests).toBe(3);
    expect(out).toHaveLength(250);
  });
  test("fetches every page when maxRecords is undefined", async () => {
    let requests = 0;
    nock(BASE)
      .get("/x")
      .query(() => {
        requests += 1;
        return true;
      })
      .reply(200, () => page(100), next(2));
    nock(BASE)
      .get("/x")
      .query(() => {
        requests += 1;
        return true;
      })
      .reply(200, () => page(200));
    const out = await paginateResults<{
      id: number;
    }>(client, "/x", true, {});
    expect(requests).toBe(2);
    expect(out).toHaveLength(200);
  });
});
const T0 = "2026-08-19T12:00:00Z";
const T1 = "2026-08-19T13:00:00Z";
const T2 = "2026-08-19T14:00:00Z";
describe("floorToSecond", () => {
  test("drops milliseconds and normalizes to Z", () => {
    expect(floorToSecond("2026-08-19T12:00:00.987Z")).toBe(T0);
    expect(floorToSecond(T0)).toBe(T0);
  });
});
describe("splitIssueChanges", () => {
  const cutoff = T1;
  test("created when created_at is after the cutoff, updated when before", () => {
    const fresh: GithubIssueRecord = { id: 1, created_at: T2, updated_at: T2 };
    const old: GithubIssueRecord = { id: 2, created_at: T0, updated_at: T2 };
    expect(splitIssueChanges([fresh, old], cutoff)).toEqual({
      created: [fresh],
      updated: [old],
    });
  });
  test("a record created in the cutoff second is created unless already delivered", () => {
    const boundary: GithubIssueRecord = {
      id: 3,
      created_at: T1,
      updated_at: T1,
    };
    expect(splitIssueChanges([boundary], cutoff).created).toEqual([boundary]);
    expect(splitIssueChanges([boundary], cutoff, [3])).toEqual({
      created: [],
      updated: [],
    });
  });
  test("a delivered boundary record updated again later is updated, not created", () => {
    const again: GithubIssueRecord = { id: 3, created_at: T1, updated_at: T2 };
    expect(splitIssueChanges([again], cutoff, [3]).updated).toEqual([again]);
  });
  test("compares at second precision", () => {
    const sameSecond: GithubIssueRecord = {
      id: 4,
      created_at: "2026-08-19T13:00:00.400Z",
      updated_at: "2026-08-19T13:00:00.400Z",
    };
    expect(splitIssueChanges([sameSecond], cutoff).created).toEqual([
      sameSecond,
    ]);
  });
});
describe("nextPollingState", () => {
  test("advancing drops carried ids and keeps only ids at the new watermark", () => {
    const a: GithubIssueRecord = { id: 1, updated_at: T1 };
    const b: GithubIssueRecord = { id: 2, updated_at: T2 };
    expect(
      nextPollingState(
        { lastPolledAt: T0, lastSeenIds: [9] },
        [a, b],
        [a, b],
        T0,
        false,
      ),
    ).toEqual({ lastPolledAt: T2, lastSeenIds: [2] });
  });
  test("holding carries the previous ids and unions newly delivered boundary ids", () => {
    const b: GithubIssueRecord = { id: 2, updated_at: T1 };
    expect(
      nextPollingState(
        { lastPolledAt: T1, lastSeenIds: [1] },
        [b],
        [b],
        T1,
        false,
      ),
    ).toEqual({ lastPolledAt: T1, lastSeenIds: [1, 2] });
  });
  test("floors a millisecond record timestamp when it becomes the watermark", () => {
    const late: GithubIssueRecord = {
      id: 1,
      updated_at: "2026-08-19T13:00:00.900Z",
    };
    expect(nextPollingState(undefined, [late], [late], T0, false)).toEqual({
      lastPolledAt: T1,
      lastSeenIds: [1],
    });
  });
  test("sets backfillActive only when asked, by presence", () => {
    expect(nextPollingState(undefined, [], [], T0, true)).toEqual({
      lastPolledAt: T0,
      lastSeenIds: [],
      backfillActive: true,
    });
    expect(nextPollingState(undefined, [], [], T0, false)).not.toHaveProperty(
      "backfillActive",
    );
  });
});
describe("fetchIssuesSince", () => {
  const BASE = "https://api.github.com";
  const client = createClient(
    createConnection(oauth2, {}, { access_token: "t" }),
    false,
  );
  const sameSecond = (from: number): GithubIssueRecord[] =>
    Array.from({ length: 100 }, (_, i) => ({ id: from + i, updated_at: T1 }));
  const serveSevenPages = () => {
    const counter = { n: 0 };
    nock(BASE)
      .persist()
      .get("/i")
      .query(() => {
        counter.n += 1;
        return true;
      })
      .reply((uri) => {
        const pg = Number(new URLSearchParams(uri.split("?")[1]).get("page"));
        return [
          200,
          sameSecond(pg * 1000),
          pg < 7 ? { link: `<${BASE}/i?page=${pg + 1}>; rel="next"` } : {},
        ];
      });
    return counter;
  };
  afterEach(() => nock.cleanAll());
  test("fetches a same-second group whole when it fills the cap, reporting the stall", async () => {
    const counter = serveSevenPages();
    const { issues, stalled } = await fetchIssuesSince(client, "/i", T1, true);
    expect(counter.n).toBe(12);
    expect(issues).toHaveLength(700);
    expect(stalled).toBe(true);
  });
  test("leaves the cap alone when the group is newer than the cursor second", async () => {
    const counter = serveSevenPages();
    const { issues, stalled } = await fetchIssuesSince(client, "/i", T0, true);
    expect(counter.n).toBe(5);
    expect(issues).toHaveLength(500);
    expect(stalled).toBe(false);
  });
});
