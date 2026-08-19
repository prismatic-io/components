import {
  buildSOQLQuery,
  formatSOQLDateTime,
  parseFullNameIdentifier,
  processOutboundMessageFields,
  toFindOptions,
  toFullNameIdentifier,
} from ".";
import {
  advanceCursor,
  buildPollingConditions,
  classifyFromCursor,
  createdSinceCursor,
  fetchPollingPage,
  fetchPollingWindow,
  getPollingChanges,
  resolveCursor,
  resolveCursorSafely,
} from "./polling";
import { resolvePollingFields } from "./pollingFields";
import { fetchDeletedRecords } from "./pollingDeletes";
import type { PollingCursor, PollingTriggerObject } from "../types";
import { pollChangesTriggerInputs } from "../inputs";
describe("toFindOptions", () => {
  it.each([
    { pageSize: undefined, pageNumber: undefined },
    { pageSize: "0", pageNumber: "0" },
    { pageSize: 0, pageNumber: 0 },
    { pageSize: "20", pageNumber: "0" },
    { pageSize: 20, pageNumber: 0 },
    { pageSize: "0", pageNumber: "1" },
    { pageSize: 0, pageNumber: 1 },
  ])("should return undefined for invalid values", ({
    pageSize,
    pageNumber,
  }) => {
    const result = toFindOptions(pageSize, pageNumber);
    expect(result).toBeUndefined();
  });
  it.each([
    { pageSize: 20, pageNumber: 1, expected: { limit: 20, offset: 0 } },
    { pageSize: "20", pageNumber: "1", expected: { limit: 20, offset: 0 } },
    { pageSize: 20, pageNumber: 2, expected: { limit: 20, offset: 20 } },
    { pageSize: "20", pageNumber: "2", expected: { limit: 20, offset: 20 } },
    { pageSize: 50, pageNumber: 5, expected: { limit: 50, offset: 200 } },
    { pageSize: "50", pageNumber: "5", expected: { limit: 50, offset: 200 } },
  ])("should return expected options object for valid values", ({
    pageSize,
    pageNumber,
    expected,
  }) => {
    const result = toFindOptions(pageSize, pageNumber);
    expect(result).toStrictEqual(expected);
  });
});
describe("toFullNameIdentifier", () => {
  it.each([
    {
      objectType: "Account",
      name: "Foo Bar Baz",
      expected: "Account.Foo_Bar_Baz",
    },
    {
      objectType: "Account",
      name: "Foo\tBar  Baz",
      expected: "Account.Foo_Bar_Baz",
    },
    {
      objectType: "Account",
      name: "helloworld",
      expected: "Account.helloworld",
    },
  ])("should return valid fullName identifiers", ({
    objectType,
    name,
    expected,
  }) => {
    const result = toFullNameIdentifier(objectType, name);
    expect(result).toStrictEqual(expected);
  });
});
describe("parseFullNameIdentifier", () => {
  it.each([
    {
      fullName: "Account.CreatedDate",
      expected: { objectType: "Account", name: "CreatedDate" },
    },
    {
      fullName: "Account.Foo_Bar_Baz",
      expected: { objectType: "Account", name: "Foo_Bar_Baz" },
    },
    {
      fullName: "Account.Some_Custom_Field__c",
      expected: { objectType: "Account", name: "Some_Custom_Field__c" },
    },
  ])("should return parsed objectType and name", ({ fullName, expected }) => {
    const result = parseFullNameIdentifier(fullName);
    expect(result).toStrictEqual(expected);
  });
});
describe("processOutboundMessageFields", () => {
  it.each([
    { fields: [], dynamicFields: [], expected: [] },
    { fields: undefined, dynamicFields: [], expected: [] },
    { fields: null, dynamicFields: [], expected: [] },
    { fields: [], dynamicFields: [], expected: [] },
    { fields: [], dynamicFields: undefined, expected: [] },
    { fields: [], dynamicFields: null, expected: [] },
    {
      fields: ["id", "name"],
      dynamicFields: ["description"],
      expected: ["id", "name", "description"],
    },
    { fields: ["name"], dynamicFields: ["name"], expected: ["name"] },
  ])("should combine fields from multiple sources", ({
    fields,
    dynamicFields,
    expected,
  }) => {
    const result = processOutboundMessageFields(fields, dynamicFields);
    expect(result).toStrictEqual(expected);
  });
});
describe("formatSOQLDateTime", () => {
  test("emits an unquoted second-precision UTC literal", () => {
    expect(formatSOQLDateTime("2026-08-10T12:34:56.789+0000")).toBe(
      "2026-08-10T12:34:56Z",
    );
  });
  test("floors sub-second precision downward rather than rounding", () => {
    expect(formatSOQLDateTime("2026-08-10T12:34:56.999Z")).toBe(
      "2026-08-10T12:34:56Z",
    );
  });
  test("accepts a Date", () => {
    expect(formatSOQLDateTime(new Date("2026-01-02T03:04:05.500Z"))).toBe(
      "2026-01-02T03:04:05Z",
    );
  });
  test("throws on an unparseable value", () => {
    expect(() => formatSOQLDateTime("not-a-date")).toThrow(
      "Invalid date value for SOQL literal",
    );
  });
});
describe("buildSOQLQuery conditions", () => {
  test("appends raw conditions to the WHERE clause without quoting them", () => {
    const soql = buildSOQLQuery({
      recordType: "Account",
      fields: ["Name"],
      filters: {},
      sortValue: "",
      conditions: ["LastModifiedDate >= 2026-08-10T12:00:00Z"],
    });
    expect(soql).toBe(
      "SELECT Id, CreatedDate, LastModifiedDate, Name FROM Account WHERE LastModifiedDate >= 2026-08-10T12:00:00Z",
    );
  });
  test("combines user equality filters with raw conditions using AND", () => {
    const soql = buildSOQLQuery({
      recordType: "Account",
      fields: [],
      filters: { Industry: "Banking" },
      sortValue: "",
      conditions: ["LastModifiedDate >= 2026-08-10T12:00:00Z"],
    });
    expect(soql).toBe(
      "SELECT Id, CreatedDate, LastModifiedDate FROM Account WHERE Industry = 'Banking' AND LastModifiedDate >= 2026-08-10T12:00:00Z",
    );
  });
  test("emits no WHERE clause when there are neither filters nor conditions", () => {
    const soql = buildSOQLQuery({
      recordType: "Account",
      fields: [],
      filters: {},
      sortValue: "",
    });
    expect(soql).toBe("SELECT Id, CreatedDate, LastModifiedDate FROM Account");
  });
});
describe("advanceCursor", () => {
  const cursor: PollingCursor = {
    watermark: "2026-08-10T12:00:00Z",
    windowStart: "2026-08-10T12:00:00Z",
    windowEnd: "2026-08-10T13:00:00Z",
    isBackfill: false,
  };
  const record = (id: string, lastModified: string): PollingTriggerObject => ({
    Id: id,
    CreatedDate: lastModified,
    LastModifiedDate: lastModified,
  });
  test("a short page is the final page: emit everything, no next cursor", () => {
    const records = [
      record("a", "2026-08-10T12:00:01.000+0000"),
      record("b", "2026-08-10T12:00:02.000+0000"),
    ];
    const { emit, nextCursor } = advanceCursor(records, cursor, 10);
    expect(emit).toEqual(records);
    expect(nextCursor).toBeNull();
  });
  test("an empty page is the final page", () => {
    const { emit, nextCursor } = advanceCursor([], cursor, 10);
    expect(emit).toEqual([]);
    expect(nextCursor).toBeNull();
  });
  test("a full page emits everything and points the keyset at its last record", () => {
    const records = [
      record("a", "2026-08-10T12:00:01.000+0000"),
      record("b", "2026-08-10T12:00:02.000+0000"),
      record("c", "2026-08-10T12:00:03.000+0000"),
    ];
    const { emit, nextCursor } = advanceCursor(records, cursor, 3);
    expect(emit.map((r) => r.Id)).toEqual(["a", "b", "c"]);
    expect(nextCursor).toEqual({
      watermark: "2026-08-10T12:00:03Z",
      lastId: "c",
      windowStart: "2026-08-10T12:00:00Z",
      windowEnd: "2026-08-10T13:00:00Z",
      isBackfill: false,
    });
  });
  test("the frozen window start, window end, and backfill flag carry forward unchanged", () => {
    const backfill: PollingCursor = { ...cursor, isBackfill: true };
    const records = [
      record("a", "2026-08-10T12:00:01.000+0000"),
      record("b", "2026-08-10T12:00:02.000+0000"),
    ];
    const { nextCursor } = advanceCursor(records, backfill, 2);
    expect(nextCursor?.windowEnd).toBe("2026-08-10T13:00:00Z");
    expect(nextCursor?.isBackfill).toBe(true);
    expect(nextCursor?.watermark).toBe("2026-08-10T12:00:02Z");
    expect(nextCursor?.windowStart).toBe("2026-08-10T12:00:00Z");
    expect(nextCursor?.lastId).toBe("b");
  });
  test("a full page sharing one timestamp advances the keyset by Id alone", () => {
    const records = [
      record("0035g00000AbCdEAAV", "2026-08-10T12:00:05.000+0000"),
      record("0035g00000XyZaBAAV", "2026-08-10T12:00:05.000+0000"),
    ];
    const { emit, nextCursor } = advanceCursor(records, cursor, 2);
    expect(emit).toEqual(records);
    expect(nextCursor).toEqual({
      watermark: "2026-08-10T12:00:05Z",
      lastId: "0035g00000XyZaBAAV",
      windowStart: "2026-08-10T12:00:00Z",
      windowEnd: "2026-08-10T13:00:00Z",
      isBackfill: false,
    });
  });
  test("the keyset advances on Id even when the timestamp does not move", () => {
    const shared: PollingCursor = {
      ...cursor,
      watermark: "2026-08-10T12:00:05Z",
      lastId: "0035g00000AbCdEAAV",
    };
    const records = [
      record("0035g00000MmNnOAAV", "2026-08-10T12:00:05.000+0000"),
      record("0035g00000XyZaBAAV", "2026-08-10T12:00:05.000+0000"),
    ];
    const { nextCursor } = advanceCursor(records, shared, 2);
    expect(nextCursor?.watermark).toBe("2026-08-10T12:00:05Z");
    expect(nextCursor?.lastId).toBe("0035g00000XyZaBAAV");
  });
  test("throws when neither the timestamp nor the Id moves forward", () => {
    const shared: PollingCursor = {
      ...cursor,
      watermark: "2026-08-10T12:00:05Z",
      lastId: "0035g00000XyZaBAAV",
    };
    const records = [
      record("0035g00000AbCdEAAV", "2026-08-10T12:00:05.000+0000"),
      record("0035g00000MmNnOAAV", "2026-08-10T12:00:05.000+0000"),
    ];
    expect(() => advanceCursor(records, shared, 2)).toThrow(
      "sorted ascending by LastModifiedDate, Id",
    );
  });
  test("a page entirely at the cursor's own timestamp still drains across rounds", () => {
    let walking: PollingCursor = {
      ...cursor,
      watermark: "2026-08-10T12:00:05Z",
    };
    const emitted: string[] = [];
    for (let page = 0; page < 4; page++) {
      const records = [
        record(`0035g0000000000${page}0AV`, "2026-08-10T12:00:05.000+0000"),
        record(`0035g0000000000${page}1AV`, "2026-08-10T12:00:05.000+0000"),
      ];
      const { emit, nextCursor } = advanceCursor(records, walking, 2);
      emitted.push(...emit.map((r) => r.Id as string));
      expect(nextCursor).not.toBeNull();
      walking = nextCursor as PollingCursor;
    }
    expect(emitted).toHaveLength(8);
    expect(walking.watermark).toBe("2026-08-10T12:00:05Z");
    expect(walking.lastId).toBe("0035g000000000031AV");
    const { nextCursor: done } = advanceCursor([], walking, 2);
    expect(done).toBeNull();
  });
  test("throws on a descending-order page instead of looping forever", () => {
    const records = [
      record("x", "2026-08-10T12:00:09.000+0000"),
      record("y", "2026-08-10T12:00:05.000+0000"),
      record("z", "2026-08-10T12:00:00.400+0000"),
    ];
    expect(() => advanceCursor(records, cursor, 3)).toThrow(
      "sorted ascending by LastModifiedDate, Id",
    );
  });
  test("an incoming watermark carrying milliseconds still advances correctly", () => {
    const subSecondCursor: PollingCursor = {
      ...cursor,
      watermark: "2026-08-10T12:00:00.500Z",
    };
    const records = [
      record("a", "2026-08-10T12:00:01.000+0000"),
      record("b", "2026-08-10T12:00:02.100+0000"),
      record("c", "2026-08-10T12:00:02.900+0000"),
    ];
    const { emit, nextCursor } = advanceCursor(records, subSecondCursor, 3);
    expect(emit.map((r) => r.Id)).toEqual(["a", "b", "c"]);
    expect(nextCursor).toEqual({
      watermark: "2026-08-10T12:00:02Z",
      lastId: "c",
      windowStart: "2026-08-10T12:00:00Z",
      windowEnd: "2026-08-10T13:00:00Z",
      isBackfill: false,
    });
  });
  test("throws on a descending page even when the incoming watermark carries milliseconds", () => {
    const subSecondCursor: PollingCursor = {
      ...cursor,
      watermark: "2026-08-10T12:00:00.500Z",
    };
    const records = [
      record("x", "2026-08-10T12:00:09.000+0000"),
      record("y", "2026-08-10T12:00:05.000+0000"),
      record("z", "2026-08-10T12:00:00.400+0000"),
    ];
    expect(() => advanceCursor(records, subSecondCursor, 3)).toThrow(
      "sorted ascending by LastModifiedDate, Id",
    );
  });
});
describe("resolvePollingFields", () => {
  const logger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
  const clientWithFields = (
    fields: {
      name: string;
      type: string;
      length?: number;
    }[],
  ) => ({ describe: jest.fn().mockResolvedValue({ fields }) }) as never;
  beforeEach(() => jest.clearAllMocks());
  test("returns only the required fields when returnIdsOnly is set", async () => {
    const client = clientWithFields([{ name: "Name", type: "string" }]);
    await expect(
      resolvePollingFields(client, "Account", ["Name"], true, logger),
    ).resolves.toEqual(["Id", "CreatedDate", "LastModifiedDate"]);
  });
  test("returnIdsOnly does not trigger a describe call", async () => {
    const client = clientWithFields([{ name: "Name", type: "string" }]);
    await resolvePollingFields(client, "Account", [], true, logger);
    expect(
      (
        client as unknown as {
          describe: jest.Mock;
        }
      ).describe,
    ).not.toHaveBeenCalled();
  });
  test("merges selected fields with the required fields, without duplicates", async () => {
    const client = clientWithFields([]);
    await expect(
      resolvePollingFields(client, "Account", ["Name", "Id"], false, logger),
    ).resolves.toEqual(["Id", "CreatedDate", "LastModifiedDate", "Name"]);
  });
  test("describes the object and returns every field when nothing is selected", async () => {
    const client = clientWithFields([
      { name: "Id", type: "id" },
      { name: "Name", type: "string" },
      { name: "CreatedDate", type: "datetime" },
      { name: "LastModifiedDate", type: "datetime" },
    ]);
    await expect(
      resolvePollingFields(client, "Account", [], false, logger),
    ).resolves.toEqual(["Id", "CreatedDate", "LastModifiedDate", "Name"]);
  });
  test("warns when two or more long text areas would clamp the query batch size", async () => {
    const client = clientWithFields([
      { name: "Notes__c", type: "textarea", length: 32000 },
      { name: "Detail__c", type: "textarea", length: 32000 },
    ]);
    await resolvePollingFields(client, "Account", [], false, logger);
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("200 records per page"),
    );
  });
  test("does not warn for ordinary short text-area fields", async () => {
    const client = clientWithFields([
      { name: "ShortA__c", type: "textarea", length: 255 },
      { name: "ShortB__c", type: "textarea", length: 255 },
    ]);
    await resolvePollingFields(client, "Account", [], false, logger);
    expect(logger.warn).not.toHaveBeenCalled();
  });
  test("warns when one long text area combines with one blob field", async () => {
    const client = clientWithFields([
      { name: "Notes__c", type: "textarea", length: 32000 },
      { name: "Attachment__c", type: "base64" },
    ]);
    await resolvePollingFields(client, "Account", [], false, logger);
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("200 records per page"),
    );
  });
});
describe("lookBackDate input", () => {
  const clean = pollChangesTriggerInputs.lookBackDate.clean as (
    v: unknown,
  ) => string;
  test("accepts a YYYY-MM-DD date, normalized to midnight UTC", () => {
    expect(clean("2026-02-01")).toBe("2026-02-01T00:00:00.000Z");
  });
  test("trims surrounding whitespace before matching", () => {
    expect(clean("  2026-02-01  ")).toBe("2026-02-01T00:00:00.000Z");
  });
  test("returns empty string when unset so no initial sync occurs", () => {
    expect(clean("")).toBe("");
    expect(clean("   ")).toBe("");
    expect(clean(undefined)).toBe("");
    expect(clean(null)).toBe("");
  });
  test.each([
    "2026-02-01T00:00:00Z",
    "2026",
    "2026-02",
    "20260201",
    "01/02/2026",
    "February 1, 2026",
    "2026-02-31",
    "2026-13-01",
  ])("rejects %p with the format message", (value) => {
    expect(() => clean(value)).toThrow(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${value}`,
    );
  });
  test("rejects a real Date object rather than accepting it as a valid value", () => {
    expect(() => clean(new Date("2026-02-01T00:00:00Z"))).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
  });
  test("rejects a number rather than reading it as a UNIX epoch", () => {
    expect(() => clean(1735689600)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 1735689600",
    );
  });
  test("rejects a date in the future", () => {
    expect(() => clean("2100-01-01")).toThrow("cannot be a future date");
  });
});
describe("polling record cap default", () => {
  test("inherits the shared 20,000 record cap", () => {
    expect(pollChangesTriggerInputs.maxRecordsToFetch.default).toBe("20000");
  });
});
describe("buildPollingConditions", () => {
  test("bounds the page below by the watermark and above by the frozen window end", () => {
    expect(
      buildPollingConditions({
        watermark: "2026-08-10T12:00:00Z",
        windowStart: "2026-08-10T12:00:00Z",
        windowEnd: "2026-08-10T13:00:00Z",
        isBackfill: false,
      }),
    ).toEqual([
      "LastModifiedDate >= 2026-08-10T12:00:00Z",
      "LastModifiedDate < 2026-08-10T13:00:00Z",
    ]);
  });
  test("resumes after a specific record once lastId is set", () => {
    expect(
      buildPollingConditions({
        watermark: "2026-08-10T12:00:05Z",
        windowStart: "2026-08-10T12:00:00Z",
        windowEnd: "2026-08-10T13:00:00Z",
        isBackfill: false,
        lastId: "0035g00000XyZaBAAV",
      }),
    ).toEqual([
      "LastModifiedDate >= 2026-08-10T12:00:05Z",
      "LastModifiedDate < 2026-08-10T13:00:00Z",
      "(LastModifiedDate > 2026-08-10T12:00:05Z OR (LastModifiedDate = 2026-08-10T12:00:05Z AND Id > '0035g00000XyZaBAAV'))",
    ]);
  });
  test("rejects a lastId that is not a Salesforce Id", () => {
    expect(() =>
      buildPollingConditions({
        watermark: "2026-08-10T12:00:05Z",
        windowStart: "2026-08-10T12:00:00Z",
        windowEnd: "2026-08-10T13:00:00Z",
        isBackfill: false,
        lastId: "' OR Id != '",
      }),
    ).toThrow("Invalid Salesforce Id");
  });
});
describe("keyset drain delivers every record exactly once", () => {
  const salesforceStub = (all: PollingTriggerObject[]) => {
    const queries: string[] = [];
    const client = {
      query: (soql: string) => {
        queries.push(soql);
        const keyset =
          /LastModifiedDate > (\S+) OR \(LastModifiedDate = \S+ AND Id > '([^']+)'\)/.exec(
            soql,
          );
        const inclusive = /LastModifiedDate >= (\S+)/.exec(soql)?.[1] ?? "";
        const upper = /LastModifiedDate < (\S+)/.exec(soql)?.[1] ?? "";
        const limit = Number(/LIMIT (\d+)/.exec(soql)?.[1] ?? "0");
        const rows = all.filter((r) => {
          const t = formatSOQLDateTime(r.LastModifiedDate);
          if (t >= upper) return false;
          if (keyset) {
            const [, ts, id] = keyset;
            return t > ts || (t === ts && (r.Id as string) > id);
          }
          return t >= inclusive;
        });
        rows.sort(
          (a, b) =>
            new Date(a.LastModifiedDate).getTime() -
              new Date(b.LastModifiedDate).getTime() ||
            (a.Id as string).localeCompare(b.Id as string),
        );
        return Promise.resolve({
          done: rows.length <= limit,
          records: rows.slice(0, limit),
        });
      },
    } as unknown as Parameters<typeof fetchPollingWindow>[0];
    return { client, queries };
  };
  const id = (n: number) => `0035g${String(n).padStart(13, "0")}`;
  const drain = async (all: PollingTriggerObject[], pageSize: number) => {
    const { client, queries } = salesforceStub(all);
    let cursor: PollingCursor | null = {
      watermark: "2026-08-10T12:00:00Z",
      windowStart: "2026-08-10T12:00:00Z",
      windowEnd: "2026-08-10T13:00:00Z",
      isBackfill: false,
    };
    const emitted: string[] = [];
    const perRound: number[] = [];
    let rounds = 0;
    while (cursor && rounds < 60) {
      const result = await fetchPollingWindow(client, {
        recordType: "Contact",
        fields: ["Id"],
        filters: {},
        cursor,
        pageSize,
      });
      emitted.push(...result.emit.map((r) => r.Id as string));
      perRound.push(result.emit.length);
      cursor = result.nextCursor;
      rounds += 1;
    }
    return { emitted, perRound, cursor, queries };
  };
  test("10 records, then 4,000 sharing one timestamp, at a page size of 500", async () => {
    const before = Array.from({ length: 10 }, (_, i) => ({
      Id: id(i),
      CreatedDate: "2026-08-10T11:00:00.000+0000",
      LastModifiedDate: `2026-08-10T12:00:01.000+0000`,
    })) as PollingTriggerObject[];
    const inside = Array.from({ length: 4000 }, (_, i) => ({
      Id: id(1000 + i),
      CreatedDate: "2026-08-10T11:00:00.000+0000",
      LastModifiedDate: "2026-08-10T12:00:05.000+0000",
    })) as PollingTriggerObject[];
    const { emitted, perRound, cursor } = await drain(
      [...before, ...inside],
      500,
    );
    expect(cursor).toBeNull();
    expect(emitted).toHaveLength(4010);
    expect(new Set(emitted).size).toBe(4010);
    expect(perRound).toEqual([500, 500, 500, 500, 500, 500, 500, 500, 10]);
  });
  test("a timestamp that is an exact multiple of the page size needs no probe round", async () => {
    const inside = Array.from({ length: 1000 }, (_, i) => ({
      Id: id(1000 + i),
      CreatedDate: "2026-08-10T11:00:00.000+0000",
      LastModifiedDate: "2026-08-10T12:00:05.000+0000",
    })) as PollingTriggerObject[];
    const { emitted, perRound, cursor } = await drain(inside, 500);
    expect(cursor).toBeNull();
    expect(emitted).toHaveLength(1000);
    expect(perRound).toEqual([500, 500, 0]);
  });
  test("the resume query is a composite keyset once a page has been emitted", async () => {
    const inside = Array.from({ length: 600 }, (_, i) => ({
      Id: id(1000 + i),
      CreatedDate: "2026-08-10T11:00:00.000+0000",
      LastModifiedDate: "2026-08-10T12:00:05.000+0000",
    })) as PollingTriggerObject[];
    const { queries } = await drain(inside, 500);
    expect(queries[0]).toContain("LastModifiedDate >= 2026-08-10T12:00:00Z");
    expect(queries[1]).toContain(
      "(LastModifiedDate > 2026-08-10T12:00:05Z OR (LastModifiedDate = 2026-08-10T12:00:05Z AND Id > '0035g0000000001499'))",
    );
    expect(
      queries.every((q) => q.includes("ORDER BY LastModifiedDate ASC, Id ASC")),
    ).toBe(true);
  });
});
describe("classifyFromCursor", () => {
  test("at a millisecond-bearing cycle-boundary watermark, a record at the floored second survives", () => {
    const cursor: PollingCursor = {
      watermark: "2026-08-10T12:00:00.437Z",
      windowStart: "2026-08-10T12:00:00.437Z",
      windowEnd: "2026-08-10T13:00:00.000Z",
      isBackfill: false,
    };
    const classifyFrom = classifyFromCursor(cursor);
    expect(classifyFrom.toISOString()).toBe("2026-08-10T11:59:59.999Z");
    const recordAtFlooredSecond: PollingTriggerObject = {
      Id: "001",
      CreatedDate: "2020-01-01T00:00:00.000Z",
      LastModifiedDate: "2026-08-10T12:00:00.000Z",
    };
    const { changes, changesObject } = getPollingChanges(
      true,
      true,
      [recordAtFlooredSecond],
      classifyFrom,
      createdSinceCursor(cursor),
    );
    expect(changes).toBe(1);
    expect(changesObject.updatedRecords).toEqual([recordAtFlooredSecond]);
  });
  test("the naive unfloored watermark minus one millisecond would have lost that same record", () => {
    const cursor: PollingCursor = {
      watermark: "2026-08-10T12:00:00.437Z",
      windowStart: "2026-08-10T12:00:00.437Z",
      windowEnd: "2026-08-10T13:00:00.000Z",
      isBackfill: false,
    };
    const naiveClassifyFrom = new Date(
      new Date(cursor.watermark).getTime() - 1,
    );
    const recordAtFlooredSecond: PollingTriggerObject = {
      Id: "001",
      CreatedDate: "2020-01-01T00:00:00.000Z",
      LastModifiedDate: "2026-08-10T12:00:00.000Z",
    };
    const { changes } = getPollingChanges(
      true,
      true,
      [recordAtFlooredSecond],
      naiveClassifyFrom,
      naiveClassifyFrom,
    );
    expect(changes).toBe(0);
  });
  test("at a second-precision page-boundary watermark, behavior is unchanged", () => {
    const cursor: PollingCursor = {
      watermark: "2026-08-10T12:00:00Z",
      windowStart: "2026-08-10T12:00:00Z",
      windowEnd: "2026-08-10T13:00:00.000Z",
      isBackfill: false,
    };
    expect(classifyFromCursor(cursor).toISOString()).toBe(
      "2026-08-10T11:59:59.999Z",
    );
  });
});
describe("createdSinceCursor", () => {
  const pageThreeCursor: PollingCursor = {
    watermark: "2026-08-10T10:30:00Z",
    windowStart: "2026-08-10T10:00:00.000Z",
    windowEnd: "2026-08-10T11:00:00.000Z",
    isBackfill: false,
  };
  const createdEarlyModifiedLate: PollingTriggerObject = {
    Id: "001",
    CreatedDate: "2026-08-10T10:15:00.000Z",
    LastModifiedDate: "2026-08-10T10:30:00.000Z",
  };
  test("anchors on the cycle's start, not the page's watermark", () => {
    expect(createdSinceCursor(pageThreeCursor).toISOString()).toBe(
      "2026-08-10T09:59:59.999Z",
    );
    expect(classifyFromCursor(pageThreeCursor).toISOString()).toBe(
      "2026-08-10T10:29:59.999Z",
    );
  });
  test("equals classifyFromCursor on page 1, where the two anchors coincide", () => {
    const pageOne: PollingCursor = {
      watermark: "2026-08-10T10:00:00.000Z",
      windowStart: "2026-08-10T10:00:00.000Z",
      windowEnd: "2026-08-10T11:00:00.000Z",
      isBackfill: false,
    };
    expect(createdSinceCursor(pageOne).getTime()).toBe(
      classifyFromCursor(pageOne).getTime(),
    );
  });
  test("a record created inside the window is classified as created on a later page", () => {
    const { changes, changesObject } = getPollingChanges(
      true,
      false,
      [createdEarlyModifiedLate],
      classifyFromCursor(pageThreeCursor),
      createdSinceCursor(pageThreeCursor),
    );
    expect(changesObject.createdRecords).toEqual([createdEarlyModifiedLate]);
    expect(changes).toBe(1);
  });
  test("reusing the page watermark for both floors drops that record entirely", () => {
    const pageFloor = classifyFromCursor(pageThreeCursor);
    const { changes, changesObject } = getPollingChanges(
      true,
      false,
      [createdEarlyModifiedLate],
      pageFloor,
      pageFloor,
    );
    expect(changesObject.createdRecords).toEqual([]);
    expect(changes).toBe(0);
  });
});
describe("getPollingChanges snapshot mode (backfill seed)", () => {
  const floor = new Date("2026-08-01T00:00:00.000Z");
  const createdInsideEditedSince: PollingTriggerObject = {
    Id: "seed-001",
    CreatedDate: "2026-08-05T00:00:00.000Z",
    LastModifiedDate: "2026-08-06T00:00:00.000Z",
  };
  const createdBeforeEditedSince: PollingTriggerObject = {
    Id: "seed-002",
    CreatedDate: "2020-01-01T00:00:00.000Z",
    LastModifiedDate: "2026-08-07T00:00:00.000Z",
  };
  test("a record created inside the window and edited since appears only in createdRecords", () => {
    const { changesObject } = getPollingChanges(
      true,
      true,
      [createdInsideEditedSince],
      floor,
      floor,
      [],
      { snapshot: true },
    );
    expect(changesObject.createdRecords).toEqual([createdInsideEditedSince]);
    expect(changesObject.updatedRecords).toEqual([]);
  });
  test("a record created before the look-back date but edited since appears only in updatedRecords", () => {
    const { changesObject } = getPollingChanges(
      true,
      true,
      [createdBeforeEditedSince],
      floor,
      floor,
      [],
      { snapshot: true },
    );
    expect(changesObject.createdRecords).toEqual([]);
    expect(changesObject.updatedRecords).toEqual([createdBeforeEditedSince]);
  });
  test("the total item count equals the record count: no record is emitted twice", () => {
    const records = [createdInsideEditedSince, createdBeforeEditedSince];
    const { changes, changesObject } = getPollingChanges(
      true,
      true,
      records,
      floor,
      floor,
      [],
      {
        snapshot: true,
      },
    );
    expect(changes).toBe(records.length);
    expect(
      changesObject.createdRecords.length + changesObject.updatedRecords.length,
    ).toBe(records.length);
  });
  test("with both Show New Records and Show Updated Records off, records are still delivered", () => {
    const records = [createdInsideEditedSince, createdBeforeEditedSince];
    const { changes, changesObject } = getPollingChanges(
      false,
      false,
      records,
      floor,
      floor,
      [],
      {
        snapshot: true,
      },
    );
    expect(changesObject.createdRecords).toEqual([createdInsideEditedSince]);
    expect(changesObject.updatedRecords).toEqual([createdBeforeEditedSince]);
    expect(changes).toBe(records.length);
  });
  test("regression guard: a steady-state poll (no snapshot option) still double-reports and still honors the toggles", () => {
    const createdAndUpdated = createdInsideEditedSince;
    const bothOn = getPollingChanges(
      true,
      true,
      [createdAndUpdated],
      floor,
      floor,
    );
    expect(bothOn.changesObject.createdRecords).toEqual([createdAndUpdated]);
    expect(bothOn.changesObject.updatedRecords).toEqual([createdAndUpdated]);
    const updatedOff = getPollingChanges(
      true,
      false,
      [createdAndUpdated],
      floor,
      floor,
    );
    expect(updatedOff.changesObject.createdRecords).toEqual([
      createdAndUpdated,
    ]);
    expect(updatedOff.changesObject.updatedRecords).toEqual([]);
  });
});
describe("fetchPollingPage", () => {
  const cursor = {
    watermark: "2026-08-10T12:00:00Z",
    windowStart: "2026-08-10T12:00:00Z",
    windowEnd: "2026-08-10T13:00:00Z",
    isBackfill: false,
  };
  test("queries ascending with an explicit LIMIT and returns the records", async () => {
    const records = [{ Id: "a", CreatedDate: "x", LastModifiedDate: "x" }];
    const client = {
      query: jest.fn().mockResolvedValue({ records, done: true }),
    } as never;
    const result = await fetchPollingPage(client, {
      recordType: "Account",
      fields: ["Name"],
      filters: { Industry: "Banking" },
      cursor,
      pageSize: 500,
    });
    expect(result).toEqual(records);
    const soql = (
      client as unknown as {
        query: jest.Mock;
      }
    ).query.mock.calls[0][0];
    expect(soql).toContain("ORDER BY LastModifiedDate ASC, Id ASC");
    expect(soql).toContain("LIMIT 500");
    expect(soql).toContain("Industry = 'Banking'");
    expect(soql).toContain("LastModifiedDate >= 2026-08-10T12:00:00Z");
    expect(soql).toContain("LastModifiedDate < 2026-08-10T13:00:00Z");
  });
  test("does not auto-fetch beyond the requested page", async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ records: [], done: true }),
    } as never;
    await fetchPollingPage(client, {
      recordType: "Account",
      fields: [],
      filters: {},
      cursor,
      pageSize: 500,
    });
    expect(
      (
        client as unknown as {
          query: jest.Mock;
        }
      ).query,
    ).toHaveBeenCalledWith(expect.any(String), {
      autoFetch: true,
      maxFetch: 500,
    });
  });
  test.each([
    0,
    -1,
    Number.NaN,
  ])("rejects an invalid page size (%p) before querying, rather than silently skipping the window", async (pageSize) => {
    const client = { query: jest.fn() } as never;
    await expect(
      fetchPollingPage(client, {
        recordType: "Account",
        fields: [],
        filters: {},
        cursor,
        pageSize,
      }),
    ).rejects.toThrow(
      `Invalid polling page size ${pageSize}: must be a positive integer.`,
    );
    expect(
      (
        client as unknown as {
          query: jest.Mock;
        }
      ).query,
    ).not.toHaveBeenCalled();
  });
  test("returns a short page normally when Salesforce confirms the result set is complete", async () => {
    const records = [{ Id: "a", CreatedDate: "x", LastModifiedDate: "x" }];
    const client = {
      query: jest.fn().mockResolvedValue({ records, done: true }),
    } as never;
    const result = await fetchPollingPage(client, {
      recordType: "Account",
      fields: [],
      filters: {},
      cursor,
      pageSize: 500,
    });
    expect(result).toEqual(records);
  });
  test("throws on a short page when Salesforce reports the result set is not complete", async () => {
    const records = [{ Id: "a", CreatedDate: "x", LastModifiedDate: "x" }];
    const client = {
      query: jest.fn().mockResolvedValue({ records, done: false }),
    } as never;
    await expect(
      fetchPollingPage(client, {
        recordType: "Account",
        fields: [],
        filters: {},
        cursor,
        pageSize: 500,
      }),
    ).rejects.toThrow("Salesforce returned 1 of 500 requested records");
  });
  test("throws on a short page when `done` is absent from the result entirely", async () => {
    const records = [{ Id: "a", CreatedDate: "x", LastModifiedDate: "x" }];
    const client = { query: jest.fn().mockResolvedValue({ records }) } as never;
    await expect(
      fetchPollingPage(client, {
        recordType: "Account",
        fields: [],
        filters: {},
        cursor,
        pageSize: 500,
      }),
    ).rejects.toThrow("Salesforce returned 1 of 500 requested records");
  });
  test("never throws for a full page, regardless of `done`", async () => {
    const records = Array.from({ length: 500 }, (_, i) => ({
      Id: `id-${i}`,
      CreatedDate: "x",
      LastModifiedDate: "x",
    }));
    const client = {
      query: jest.fn().mockResolvedValue({ records, done: false }),
    } as never;
    const result = await fetchPollingPage(client, {
      recordType: "Account",
      fields: [],
      filters: {},
      cursor,
      pageSize: 500,
    });
    expect(result).toEqual(records);
  });
});
describe("fetchDeletedRecords", () => {
  const logger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());
  const deleteClient = (result: Record<string, unknown>) =>
    ({
      sobject: jest
        .fn()
        .mockReturnValue({ deleted: jest.fn().mockResolvedValue(result) }),
    }) as never;
  const now = "2026-08-10T12:00:00.000Z";
  test("maps the API shape onto DeletedRecord", async () => {
    const client = deleteClient({
      deletedRecords: [{ id: "001", deletedDate: "2026-08-10T11:00:00.000Z" }],
      latestDateCovered: "2026-08-10T11:59:00.000Z",
    });
    const { deletedRecords } = await fetchDeletedRecords(
      client,
      "Account",
      "2026-08-10T10:00:00.000Z",
      now,
      logger,
    );
    expect(deletedRecords).toEqual([
      { id: "001", deletedDate: "2026-08-10T11:00:00.000Z", IsDeleted: true },
    ]);
  });
  test("advances from latestDateCovered, not the requested end", async () => {
    const client = deleteClient({
      deletedRecords: [],
      latestDateCovered: "2026-08-10T11:59:00.000Z",
    });
    const { coveredUntil } = await fetchDeletedRecords(
      client,
      "Account",
      "2026-08-10T10:00:00.000Z",
      now,
      logger,
    );
    expect(coveredUntil).toBe("2026-08-10T11:59:00.000Z");
  });
  test("falls back to the window's own start, never `now`, when the API omits latestDateCovered", async () => {
    const client = deleteClient({ deletedRecords: [] });
    const since = "2026-08-10T10:00:00.000Z";
    const { coveredUntil } = await fetchDeletedRecords(
      client,
      "Account",
      since,
      now,
      logger,
    );
    expect(coveredUntil).toBe(since);
    expect(coveredUntil).not.toBe(now);
  });
  test("clamps a start older than the 15-day window to the exact boundary and warns", async () => {
    const client = deleteClient({ deletedRecords: [] });
    await fetchDeletedRecords(
      client,
      "Account",
      "2020-01-01T00:00:00.000Z",
      now,
      logger,
    );
    const start = (
      client as unknown as {
        sobject: jest.Mock;
      }
    ).sobject.mock.results[0].value.deleted.mock.calls[0][0];
    expect(start).toBe(
      new Date(
        new Date(now).getTime() - 15 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    );
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("15 days"),
    );
  });
  test("passes a since inside the window through untouched and does not warn about clamping", async () => {
    const client = deleteClient({ deletedRecords: [] });
    const since = "2026-08-05T00:00:00.000Z";
    await fetchDeletedRecords(client, "Account", since, now, logger);
    const start = (
      client as unknown as {
        sobject: jest.Mock;
      }
    ).sobject.mock.results[0].value.deleted.mock.calls[0][0];
    expect(start).toBe(since);
    expect(logger.warn).not.toHaveBeenCalledWith(
      expect.stringContaining("15 days"),
    );
  });
  test("warns when earliestDateAvailable is later than the requested start", async () => {
    const client = deleteClient({
      deletedRecords: [],
      latestDateCovered: now,
      earliestDateAvailable: "2026-08-10T09:00:00.000Z",
    });
    await fetchDeletedRecords(
      client,
      "Account",
      "2026-08-10T08:00:00.000Z",
      now,
      logger,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("2026-08-10T09:00:00.000Z"),
    );
  });
  test("does not warn when earliestDateAvailable precedes the requested start", async () => {
    const client = deleteClient({
      deletedRecords: [],
      latestDateCovered: now,
      earliestDateAvailable: "2026-08-10T07:00:00.000Z",
    });
    await fetchDeletedRecords(
      client,
      "Account",
      "2026-08-10T08:00:00.000Z",
      now,
      logger,
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
describe("resolveCursor", () => {
  const now = "2026-08-10T12:00:00.000Z";
  test("resumes an in-flight cursor unchanged", () => {
    const incoming = {
      watermark: "2026-08-10T11:00:00Z",
      windowStart: "2026-08-10T11:00:00Z",
      windowEnd: "2026-08-10T11:30:00Z",
      isBackfill: true,
    };
    expect(
      resolveCursor({ incoming, state: {}, lookBackDate: "", now }),
    ).toEqual(incoming);
  });
  test("prefers the platform cursor over the persisted one", () => {
    const incoming = {
      watermark: "2026-08-10T11:00:00Z",
      windowStart: "2026-08-10T11:00:00Z",
      windowEnd: "2026-08-10T11:30:00Z",
      isBackfill: false,
    };
    const stale = {
      watermark: "2026-08-01T00:00:00Z",
      windowStart: "2026-08-01T00:00:00Z",
      windowEnd: "2026-08-01T01:00:00Z",
      isBackfill: false,
    };
    expect(
      resolveCursor({
        incoming,
        state: { cursor: stale },
        lookBackDate: "",
        now,
      }),
    ).toEqual(incoming);
  });
  test("falls back to the persisted cursor when the platform sends none", () => {
    const persisted = {
      watermark: "2026-08-10T11:00:00Z",
      windowStart: "2026-08-10T11:00:00Z",
      windowEnd: "2026-08-10T11:30:00Z",
      isBackfill: true,
    };
    expect(
      resolveCursor({
        incoming: undefined,
        state: { cursor: persisted },
        lookBackDate: "",
        now,
      }),
    ).toEqual(persisted);
  });
  test("keeps the resumed cursor's watermark when it is ahead of lastPolledAt", () => {
    const resumed = {
      watermark: "2026-08-10T11:20:00.000Z",
      windowStart: "2026-08-10T11:00:00.000Z",
      windowEnd: "2026-08-10T11:30:00.000Z",
      isBackfill: false,
    };
    expect(
      resolveCursor({
        incoming: resumed,
        state: { lastPolledAt: "2026-08-10T11:00:00.000Z" },
        lookBackDate: "",
        now,
      }),
    ).toEqual(resumed);
  });
  test("keeps the resumed cursor's watermark when state has no lastPolledAt", () => {
    const resumed = {
      watermark: "2026-08-10T11:00:00.000Z",
      windowStart: "2026-08-10T11:00:00.000Z",
      windowEnd: "2026-08-10T11:30:00.000Z",
      isBackfill: false,
    };
    expect(
      resolveCursor({
        incoming: undefined,
        state: { cursor: resumed },
        lookBackDate: "",
        now,
      }),
    ).toEqual(resumed);
  });
  test("starts a backfill from the look back date on the very first poll", () => {
    expect(
      resolveCursor({
        incoming: undefined,
        state: {},
        lookBackDate: "2026-01-01T00:00:00.000Z",
        now,
      }),
    ).toEqual({
      watermark: "2026-01-01T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: now,
      isBackfill: true,
    });
  });
  test("an empty Look-back Date means no backfill: the cursor opens at now with an empty window", () => {
    expect(
      resolveCursor({
        incoming: undefined,
        state: {},
        lookBackDate: "",
        now,
      }),
    ).toEqual({
      watermark: now,
      windowStart: now,
      windowEnd: now,
      isBackfill: false,
    });
  });
  test("resumes incrementally from lastPolledAt, not as a backfill", () => {
    expect(
      resolveCursor({
        incoming: undefined,
        state: { lastPolledAt: "2026-08-10T11:00:00.000Z" },
        lookBackDate: "2026-01-01T00:00:00.000Z",
        now,
      }),
    ).toEqual({
      watermark: "2026-08-10T11:00:00.000Z",
      windowStart: "2026-08-10T11:00:00.000Z",
      windowEnd: now,
      isBackfill: false,
    });
  });
  test("returns the persisted cursor unchanged when lastPolledAt is ahead of its watermark", () => {
    const cursor = {
      watermark: "2026-03-01T00:00:00.000Z",
      windowStart: "2026-03-01T00:00:00.000Z",
      windowEnd: "2026-08-10T12:00:00.000Z",
      isBackfill: true,
    };
    expect(
      resolveCursor({
        incoming: undefined,
        state: { cursor, lastPolledAt: "2026-08-10T11:59:00.000Z" },
        lookBackDate: "",
        now,
      }),
    ).toEqual(cursor);
  });
  test("returns the platform cursor unchanged when lastPolledAt is ahead of its watermark", () => {
    const incoming = {
      watermark: "2026-03-01T00:00:00.000Z",
      windowStart: "2026-03-01T00:00:00.000Z",
      windowEnd: "2026-08-10T12:00:00.000Z",
      isBackfill: true,
    };
    expect(
      resolveCursor({
        incoming,
        state: { lastPolledAt: "2026-08-10T11:59:00.000Z" },
        lookBackDate: "",
        now,
      }),
    ).toEqual(incoming);
  });
  describe("tolerates a resumed cursor from before windowStart existed", () => {
    const legacy = {
      watermark: "2026-08-10T11:00:00Z",
      windowEnd: "2026-08-10T11:30:00Z",
      isBackfill: false,
    } as unknown as PollingCursor;
    test("falls back to the watermark rather than throwing, for a persisted cursor", () => {
      expect(
        resolveCursor({
          incoming: undefined,
          state: { cursor: legacy },
          lookBackDate: "",
          now,
        }),
      ).toEqual({ ...legacy, windowStart: "2026-08-10T11:00:00Z" });
    });
    test("falls back to the watermark rather than throwing, for a platform cursor", () => {
      expect(
        resolveCursor({ incoming: legacy, state: {}, lookBackDate: "", now }),
      ).toEqual({
        ...legacy,
        windowStart: "2026-08-10T11:00:00Z",
      });
    });
    test("still rejects a windowStart that is present but not a valid date", () => {
      const corrupted = {
        ...legacy,
        windowStart: 1699999999999,
      } as unknown as PollingCursor;
      expect(() =>
        resolveCursor({
          incoming: corrupted,
          state: {},
          lookBackDate: "",
          now,
        }),
      ).toThrow(/windowStart/i);
    });
  });
  describe("validates resumed state before trusting it", () => {
    test("throws when the persisted cursor's watermark is null instead of a string", () => {
      const corrupted = {
        watermark: null,
        windowEnd: "2026-08-10T11:30:00.000Z",
        isBackfill: false,
      } as unknown as PollingCursor;
      expect(() =>
        resolveCursor({
          incoming: undefined,
          state: { cursor: corrupted },
          lookBackDate: "",
          now,
        }),
      ).toThrow(/watermark/i);
    });
    test("throws when the platform-provided cursor's windowEnd is a number instead of a string", () => {
      const corrupted = {
        watermark: "2026-08-10T11:00:00.000Z",
        windowEnd: 1699999999999,
        isBackfill: false,
      } as unknown as PollingCursor;
      expect(() =>
        resolveCursor({
          incoming: corrupted,
          state: {},
          lookBackDate: "",
          now,
        }),
      ).toThrow(/windowEnd/i);
    });
    test("throws when the persisted cursor's isBackfill is a string instead of a boolean", () => {
      const corrupted = {
        watermark: "2026-08-10T11:00:00.000Z",
        windowEnd: "2026-08-10T11:30:00.000Z",
        isBackfill: "false",
      } as unknown as PollingCursor;
      expect(() =>
        resolveCursor({
          incoming: undefined,
          state: { cursor: corrupted },
          lookBackDate: "",
          now,
        }),
      ).toThrow(/isBackfill/i);
    });
    test("throws when lastPolledAt is a number instead of an ISO date string", () => {
      const state = { lastPolledAt: 1699999999999 } as unknown as {
        lastPolledAt: string;
      };
      expect(() =>
        resolveCursor({ incoming: undefined, state, lookBackDate: "", now }),
      ).toThrow(/lastPolledAt/i);
    });
    test("throws when lastPolledAt is an unparseable string", () => {
      expect(() =>
        resolveCursor({
          incoming: undefined,
          state: { lastPolledAt: "not-a-date" },
          lookBackDate: "",
          now,
        }),
      ).toThrow(/lastPolledAt/i);
    });
    test("treats a null lastPolledAt as absent rather than validating it, falling back to backfill", () => {
      const state = { lastPolledAt: null } as unknown as {
        lastPolledAt: string;
      };
      expect(
        resolveCursor({
          incoming: undefined,
          state,
          lookBackDate: "2026-01-01T00:00:00.000Z",
          now,
        }),
      ).toEqual({
        watermark: "2026-01-01T00:00:00.000Z",
        windowStart: "2026-01-01T00:00:00.000Z",
        windowEnd: now,
        isBackfill: true,
      });
    });
  });
  describe("keyset fields", () => {
    const base = {
      watermark: "2026-08-10T12:00:05Z",
      windowStart: "2026-08-10T12:00:00Z",
      windowEnd: "2026-08-10T13:00:00Z",
      isBackfill: false,
    };
    test("resumes a keyset cursor unchanged", () => {
      const incoming = { ...base, lastId: "0035g00000XyZaBAAV" };
      expect(
        resolveCursor({ incoming, state: {}, lookBackDate: "", now }),
      ).toEqual(incoming);
    });
    test("rejects a non-string lastId", () => {
      const incoming = { ...base, lastId: 42 } as unknown as PollingCursor;
      expect(() =>
        resolveCursor({ incoming, state: {}, lookBackDate: "", now }),
      ).toThrow("cursor.lastId");
    });
  });
});
describe("resolveCursorSafely", () => {
  const now = "2026-08-10T12:00:00.000Z";
  const logger = { warn: jest.fn() };
  beforeEach(() => jest.clearAllMocks());
  test("discards a corrupted persisted cursor, warns, and falls back to lastPolledAt", () => {
    const corruptedPersisted = {
      watermark: null,
      windowEnd: "2026-08-10T11:30:00.000Z",
      isBackfill: false,
    } as unknown as PollingCursor;
    const result = resolveCursorSafely({
      incoming: undefined,
      state: {
        cursor: corruptedPersisted,
        lastPolledAt: "2026-08-10T11:00:00.000Z",
      },
      lookBackDate: "",
      now,
      logger,
    });
    expect(result).toEqual({
      watermark: "2026-08-10T11:00:00.000Z",
      windowStart: "2026-08-10T11:00:00.000Z",
      windowEnd: now,
      isBackfill: false,
    });
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("watermark"),
    );
  });
  test("discards a corrupted persisted cursor with no lastPolledAt, falling back to a fresh backfill", () => {
    const corruptedPersisted = {
      watermark: "2026-08-10T11:00:00.000Z",
      windowEnd: "2026-08-10T11:30:00.000Z",
      isBackfill: "false",
    } as unknown as PollingCursor;
    const result = resolveCursorSafely({
      incoming: undefined,
      state: { cursor: corruptedPersisted },
      lookBackDate: "2026-01-01T00:00:00.000Z",
      now,
      logger,
    });
    expect(result).toEqual({
      watermark: "2026-01-01T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: now,
      isBackfill: true,
    });
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
  test("lets a throw from the platform-supplied cursor propagate without warning or retrying", () => {
    const corruptedIncoming = {
      watermark: "2026-08-10T11:00:00.000Z",
      windowEnd: 1699999999999,
      isBackfill: false,
    } as unknown as PollingCursor;
    expect(() =>
      resolveCursorSafely({
        incoming: corruptedIncoming,
        state: {},
        lookBackDate: "",
        now,
        logger,
      }),
    ).toThrow(/windowEnd/i);
    expect(logger.warn).not.toHaveBeenCalled();
  });
  test("does not intervene when there is no persisted cursor to blame — an unrelated throw still propagates", () => {
    const state = { lastPolledAt: "not-a-date" } as unknown as {
      lastPolledAt: string;
    };
    expect(() =>
      resolveCursorSafely({
        incoming: undefined,
        state,
        lookBackDate: "",
        now,
        logger,
      }),
    ).toThrow(/lastPolledAt/i);
    expect(logger.warn).not.toHaveBeenCalled();
  });
  test("passes through cleanly when the persisted cursor is valid", () => {
    const persisted = {
      watermark: "2026-08-10T11:00:00.000Z",
      windowStart: "2026-08-10T11:00:00.000Z",
      windowEnd: "2026-08-10T11:30:00.000Z",
      isBackfill: true,
    };
    const result = resolveCursorSafely({
      incoming: undefined,
      state: { cursor: persisted },
      lookBackDate: "",
      now,
      logger,
    });
    expect(result).toEqual(persisted);
    expect(logger.warn).not.toHaveBeenCalled();
  });
  test("when the persisted cursor AND lastPolledAt are both corrupted, falls all the way through to a fresh backfill", () => {
    const corruptedPersisted = {
      watermark: null,
      windowEnd: "2026-08-10T11:30:00.000Z",
      isBackfill: false,
    } as unknown as PollingCursor;
    const state = {
      cursor: corruptedPersisted,
      lastPolledAt: "not-a-date",
    } as unknown as {
      cursor: PollingCursor;
      lastPolledAt: string;
    };
    const result = resolveCursorSafely({
      incoming: undefined,
      state,
      lookBackDate: "2026-01-01T00:00:00.000Z",
      now,
      logger,
    });
    expect(result).toEqual({
      watermark: "2026-01-01T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: now,
      isBackfill: true,
    });
    expect(logger.warn).toHaveBeenCalledTimes(2);
    expect(logger.warn).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("watermark"),
    );
    expect(logger.warn).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("lastPolledAt"),
    );
  });
});
