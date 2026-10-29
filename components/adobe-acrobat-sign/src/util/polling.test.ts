import { describe, test, expect, vi } from "vitest";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { POLL_PAGE_SIZE } from "../constants";
import {
  fetchAgreementsModifiedSince,
  lookBackDateClean,
  partitionAgreementsByTimestamp,
  resolvePollingRecordChanges,
} from "./polling";

describe("resolvePollingRecordChanges", () => {
  test("returns empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });

  test("returns empty array when both arrays are empty", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });

  test("maps created and updated with correct changeType", () => {
    const result = resolvePollingRecordChanges({
      created: [{ id: "c1" }],
      updated: [{ id: "u1" }],
    });
    expect(result).toEqual([
      { changeType: "created", record: { id: "c1" } },
      { changeType: "updated", record: { id: "u1" } },
    ]);
  });
});

describe("partitionAgreementsByTimestamp", () => {
  const since = new Date("2026-01-15T00:00:00Z");

  test("classifies records created after since as created", () => {
    const records = [
      {
        createdDate: "2026-02-01T00:00:00Z",
        modifiedDate: "2026-02-01T00:00:00Z",
      },
    ];
    const { created, updated } = partitionAgreementsByTimestamp(records, since);
    expect(created).toHaveLength(1);
    expect(updated).toHaveLength(0);
  });

  test("classifies records modified after since but created before as updated", () => {
    const records = [
      {
        createdDate: "2025-06-01T00:00:00Z",
        modifiedDate: "2026-02-01T00:00:00Z",
      },
    ];
    const { created, updated } = partitionAgreementsByTimestamp(records, since);
    expect(created).toHaveLength(0);
    expect(updated).toHaveLength(1);
  });

  test("records with neither timestamp are pushed to updated", () => {
    const records = [{}];
    const { created, updated } = partitionAgreementsByTimestamp(records, since);
    expect(created).toHaveLength(0);
    expect(updated).toHaveLength(1);
  });

  test("created beats updated when both qualify", () => {
    const records = [
      {
        createdDate: "2026-02-01T00:00:00Z",
        modifiedDate: "2026-03-01T00:00:00Z",
      },
    ];
    const { created, updated } = partitionAgreementsByTimestamp(records, since);
    expect(created).toHaveLength(1);
    expect(updated).toHaveLength(0);
  });
});

describe("fetchAgreementsModifiedSince", () => {
  const makeClient = (
    responses: { agreementAssetEvents: Record<string, unknown>[] }[],
  ) => {
    let call = 0;
    return {
      post: vi.fn(async () => {
        const data = responses[call] ?? { agreementAssetEvents: [] };
        call += 1;
        return { data };
      }),
    } as unknown as HttpClient;
  };

  const fullPage = (startMod: string, count = POLL_PAGE_SIZE) =>
    Array.from({ length: count }, (_, i) => ({
      id: `agr-${i}`,
      modifiedDate: `${startMod}T${String(i).padStart(2, "0")}:00:00Z`,
    }));

  test("ceiling guard fires when resumeStartIndex is near 10000", async () => {
    const client = makeClient([]);
    const result = await fetchAgreementsModifiedSince(
      client,
      "2026-01-01T00:00:00Z",
      {
        resumeStartIndex: 9900,
      },
    );

    expect(client.post).not.toHaveBeenCalled();
    expect(result.truncated).toBe(true);
    expect(result.records).toHaveLength(0);
    expect(result.nextStartIndex).toBe(9900);
    expect(result.latestModifiedDate).toBeUndefined();
  });

  test("latestModifiedDate is the high-water mark of fetched records", async () => {
    const records = [
      { id: "a1", modifiedDate: "2026-01-10T00:00:00Z" },
      { id: "a2", modifiedDate: "2026-01-15T00:00:00Z" },
      { id: "a3", modifiedDate: "2026-01-12T00:00:00Z" },
    ];
    const client = makeClient([{ agreementAssetEvents: records }]);
    const result = await fetchAgreementsModifiedSince(
      client,
      "2026-01-01T00:00:00Z",
    );

    expect(result.latestModifiedDate).toBe("2026-01-15T00:00:00Z");
  });

  test("latestModifiedDate is undefined when no records have modifiedDate", async () => {
    const client = makeClient([{ agreementAssetEvents: [{ id: "a1" }] }]);
    const result = await fetchAgreementsModifiedSince(
      client,
      "2026-01-01T00:00:00Z",
    );

    expect(result.latestModifiedDate).toBeUndefined();
  });

  test("truncated is true when page cap is reached with full pages", async () => {
    const client = makeClient([
      { agreementAssetEvents: fullPage("2026-01-01") },
    ]);
    const result = await fetchAgreementsModifiedSince(
      client,
      "2026-01-01T00:00:00Z",
      {
        maxPages: 1,
      },
    );

    expect(result.truncated).toBe(true);
    expect(result.records).toHaveLength(POLL_PAGE_SIZE);
    expect(result.nextStartIndex).toBe(POLL_PAGE_SIZE);
  });

  test("truncated is false when a partial page indicates exhaustion", async () => {
    const partial = fullPage("2026-01-01", 10);
    const client = makeClient([{ agreementAssetEvents: partial }]);
    const result = await fetchAgreementsModifiedSince(
      client,
      "2026-01-01T00:00:00Z",
    );

    expect(result.truncated).toBe(false);
    expect(result.records).toHaveLength(10);
  });

  test("ceiling guard fires mid-walk when offset accumulates past threshold", async () => {
    const client = makeClient([
      { agreementAssetEvents: fullPage("2026-01-01") },
    ]);
    const result = await fetchAgreementsModifiedSince(
      client,
      "2026-01-01T00:00:00Z",
      {
        resumeStartIndex: 9800,
        maxPages: 50,
      },
    );

    expect(client.post).toHaveBeenCalledTimes(1);
    expect(result.truncated).toBe(true);
    expect(result.nextStartIndex).toBe(9900);
  });
});

describe("lookBackDateClean", () => {
  test("returns empty string for empty input", () => {
    expect(lookBackDateClean("")).toBe("");
  });

  test("returns valid YYYY-MM-DD string as-is", () => {
    expect(lookBackDateClean("2025-06-15")).toBe("2025-06-15");
  });

  test("throws on invalid format", () => {
    expect(() => lookBackDateClean("15/06/2025")).toThrow("YYYY-MM-DD");
  });

  test("throws on invalid calendar date", () => {
    expect(() => lookBackDateClean("2025-02-30")).toThrow(
      "not a valid calendar date",
    );
  });

  test("throws on future date", () => {
    expect(() => lookBackDateClean("2099-01-01")).toThrow("future date");
  });
});
