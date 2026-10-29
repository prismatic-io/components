import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { Mock } from "vitest";
import { fetchRecords, lookBackDateClean } from "./util";

const createMockClient = (getMock: Mock) =>
  ({ get: getMock }) as unknown as HttpClient;

const page = (object: string, ids: number[], more: boolean) => ({
  data: {
    results: {
      [object]: Object.fromEntries(
        ids.map((id) => [String(id), { id, name: `Record ${id}` }]),
      ),
    },
    more,
    supplemental_data: {},
  },
});

describe("fetchRecords", () => {
  let getMock: Mock;

  beforeEach(() => {
    getMock = vi.fn();
  });

  it("returns each record from the id-keyed map under results.<object>", async () => {
    getMock.mockResolvedValueOnce(page("users", [933849, 933850], false));

    const records = await fetchRecords(createMockClient(getMock), "users", {});

    expect(records).toEqual([
      { id: 933849, name: "Record 933849" },
      { id: 933850, name: "Record 933850" },
    ]);
  });

  it("requests the next page while the response reports more", async () => {
    getMock
      .mockResolvedValueOnce(page("jobcodes", [1, 2], true))
      .mockResolvedValueOnce(page("jobcodes", [3], false));

    const records = await fetchRecords(
      createMockClient(getMock),
      "jobcodes",
      {},
    );

    expect(records.map((r) => r.id)).toEqual([1, 2, 3]);
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(getMock).toHaveBeenNthCalledWith(1, "/jobcodes?page=1&limit=200");
    expect(getMock).toHaveBeenNthCalledWith(2, "/jobcodes?page=2&limit=200");
  });

  it("stops when more is false, however many records the page held", async () => {
    getMock.mockResolvedValueOnce(
      page(
        "users",
        Array.from({ length: 60 }, (_, i) => i + 1),
        false,
      ),
    );

    const records = await fetchRecords(createMockClient(getMock), "users", {});

    expect(records).toHaveLength(60);
    expect(getMock).toHaveBeenCalledTimes(1);
  });

  it("forwards the caller's query parameters on every page", async () => {
    getMock
      .mockResolvedValueOnce(page("timesheets", [10], true))
      .mockResolvedValueOnce(page("timesheets", [11], false));

    await fetchRecords(createMockClient(getMock), "timesheets", {
      start_date: "2026-09-01",
    });

    expect(getMock).toHaveBeenNthCalledWith(
      1,
      "/timesheets?start_date=2026-09-01&page=1&limit=200",
    );
    expect(getMock).toHaveBeenNthCalledWith(
      2,
      "/timesheets?start_date=2026-09-01&page=2&limit=200",
    );
  });

  it("returns no records when the response has no results for the object", async () => {
    getMock.mockResolvedValueOnce({ data: { results: {}, more: false } });

    const records = await fetchRecords(createMockClient(getMock), "users", {});

    expect(records).toEqual([]);
    expect(getMock).toHaveBeenCalledTimes(1);
  });
});

describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-06T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("normalizes a YYYY-MM-DD date to 00:00:00 UTC of that day", () => {
    expect(lookBackDateClean("2026-01-15")).toBe("2026-01-15T00:00:00.000Z");
  });

  it("trims surrounding whitespace", () => {
    expect(lookBackDateClean("  2026-01-15\n")).toBe(
      "2026-01-15T00:00:00.000Z",
    );
  });

  it("accepts today", () => {
    expect(lookBackDateClean("2026-10-06")).toBe("2026-10-06T00:00:00.000Z");
  });

  it.each([
    ["an empty string", ""],
    ["whitespace only", "   "],
    ["undefined", undefined],
    ["null", null],
  ])("returns an empty string for %s", (_label, value) => {
    expect(lookBackDateClean(value)).toBe("");
  });

  it("rejects a date in another format", () => {
    expect(() => lookBackDateClean("01/15/2026")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 01/15/2026",
    );
  });

  it.each([
    ["a number", 20260115],
    ["a Date", new Date("2026-01-15T00:00:00.000Z")],
  ])("rejects %s", (_label, value) => {
    expect(() => lookBackDateClean(value)).toThrow(
      /Look-back Date must be a date/,
    );
  });

  it("rejects a non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 2026-02-31",
    );
  });

  it("rejects a future date", () => {
    expect(() => lookBackDateClean("2026-10-07")).toThrow(
      "Look-back Date cannot be a future date. Received: 2026-10-07",
    );
  });
});
