import { beforeEach, describe, expect, test, vi } from "vitest";
import type { PollingState, SurveyResponseDetails } from "../types";
import { lookBackDateClean, resolveSurveyResponseChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("../client", () => ({ createClient }));
const response = (
  id: string,
  createdAt: string,
  modifiedAt: string,
): SurveyResponseDetails => ({
  id,
  survey_id: "1234567890",
  collector_id: "987654321",
  response_status: "completed",
  date_created: createdAt,
  date_modified: modifiedAt,
  href: `https://api.surveymonkey.com/v3/surveys/1234567890/responses/${id}`,
  pages: [],
});
const createdResponse = response(
  "r1",
  "2026-06-01T12:00:00+00:00",
  "2026-06-01T12:00:00+00:00",
);
const updatedResponse = response(
  "r2",
  "2020-01-01T00:00:00+00:00",
  "2026-06-01T12:00:00+00:00",
);
describe("pollChangesTrigger batching declaration", () => {
  test("declares opt-in batching with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("offers the Look-back Date directly below the required inputs", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "surveyId",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveSurveyResponseChanges", () => {
  test("tags every response with how it changed", () => {
    expect(
      resolveSurveyResponseChanges({
        created: [createdResponse],
        updated: [updatedResponse],
      }),
    ).toEqual([
      { changeType: "created", record: createdResponse },
      { changeType: "updated", record: updatedResponse },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolveSurveyResponseChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolveSurveyResponseChanges(undefined)).toEqual([]);
  });
  test("tolerates an absent array at runtime", () => {
    const partial = { created: [createdResponse] } as never;
    expect(resolveSurveyResponseChanges(partial)).toEqual([
      { changeType: "created", record: createdResponse },
    ]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens a realistic trigger payload into tagged items", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: {
          body: {
            data: { created: [createdResponse], updated: [updatedResponse] },
          },
        },
      } as never,
    );
    expect(items).toEqual([
      { changeType: "created", record: createdResponse },
      { changeType: "updated", record: updatedResponse },
    ]);
  });
});
describe("lookBackDateClean", () => {
  test("treats empty input as no backfill", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("normalizes a date to the start of that day in UTC", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a malformed, non-calendar, or future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
describe("pollChangesTrigger perform", () => {
  type PerformArgs = Parameters<typeof pollChangesTrigger.perform>;
  let store: PollingState | undefined;
  let get: ReturnType<typeof vi.fn>;
  const context = () =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    }) as unknown as PerformArgs[0];
  const params = {
    connection: {} as never,
    surveyId: "1234567890",
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
  };
  const seed = "2026-01-01T00:00:00.000Z";
  const noPayload = {} as unknown as PerformArgs[1];
  const reply = (...records: SurveyResponseDetails[]) =>
    get.mockResolvedValue({ data: { data: records, links: {} } });
  beforeEach(() => {
    store = undefined;
    get = vi.fn();
    createClient.mockReturnValue({ get });
  });
  test("seeds start_modified_at from the Look-back Date, inclusive of that day", async () => {
    reply();
    await pollChangesTrigger.perform(context(), noPayload, {
      ...params,
      lookBackDate: seed,
    });
    expect(get.mock.calls[0][1].params).toMatchObject({
      start_modified_at: "2026-01-01T00:00:00",
      sort_by: "date_modified",
      sort_order: "ASC",
    });
  });
  test("an initial sync ignores the visibility toggles and counts the seed instant as new", async () => {
    const onSeed = response(
      "r3",
      "2026-01-01T00:00:00+00:00",
      "2026-01-01T00:00:00+00:00",
    );
    reply(onSeed, updatedResponse);
    const result = await pollChangesTrigger.perform(context(), noPayload, {
      ...params,
      lookBackDate: seed,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result?.payload.body).toEqual({
      data: { created: [onSeed], updated: [updatedResponse] },
    });
    expect(result?.polledNoChanges).toBe(false);
    expect(store?.lastPolledAt).toBeDefined();
    expect(store?.lastPolledAt).not.toBe(seed);
  });
  test("later recurrences ignore the Look-back Date and honor the toggles", async () => {
    store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
    reply(createdResponse, updatedResponse);
    const result = await pollChangesTrigger.perform(context(), noPayload, {
      ...params,
      lookBackDate: seed,
      showNewRecords: false,
    });
    expect(get.mock.calls[0][1].params.start_modified_at).toBe(
      "2026-06-01T00:00:00",
    );
    expect(result?.payload.body).toEqual({
      data: { created: [], updated: [updatedResponse] },
    });
  });
  test("without a Look-back Date the first recurrence only establishes the baseline", async () => {
    reply();
    const result = await pollChangesTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result?.polledNoChanges).toBe(true);
    expect(store?.lastPolledAt).toBeDefined();
  });
});
