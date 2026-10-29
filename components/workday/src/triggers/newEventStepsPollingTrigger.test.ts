import nock from "nock";
import {
  createPollingContext,
  oauthTestConnection,
  TEST_HOST,
} from "../testHelpers";
import type { PollingState, WorkdayEventStep } from "../types";
import { newEventStepsPollingTrigger } from "./newEventStepsPollingTrigger";

type PerformArgs = Parameters<typeof newEventStepsPollingTrigger.perform>;
type PollResult = { polledNoChanges?: boolean };

const STEPS_PATH = "/ccx/businessProcess/v1/eventSteps";
const NOW = "2026-10-15T12:00:00.000Z";
const step = (id: string, creationDate: string): WorkdayEventStep => ({
  id,
  descriptor: `Approval step ${id}`,
  creationDate,
});
const yesterday = step("s1", "2026-10-14");
const today = step("s2", "2026-10-15");
const later = step("s3", "2026-10-15");

const store: { state?: PollingState } = {};
const context = (batching = false) =>
  createPollingContext<PerformArgs[0]>(store, { batching });
const noPayload = {} as PerformArgs[1];
const params = {
  connection: oauthTestConnection(),
  lookBackDate: "",
  businessProcess: undefined as string[] | undefined,
  stepType: undefined as string[] | undefined,
};
const mockSteps = (
  query: Record<string, unknown>,
  steps: WorkdayEventStep[],
  total = steps.length,
) =>
  nock(TEST_HOST)
    .get(STEPS_PATH)
    .query({ limit: "100", offset: "0", ...query })
    .reply(200, { total, data: steps });

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
beforeEach(() => {
  store.state = undefined;
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(NOW));
});
afterEach(() => {
  vi.useRealTimers();
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});

describe("newEventStepsPollingTrigger declaration", () => {
  it("declares opt-in batching with a default batch size", () => {
    expect(newEventStepsPollingTrigger.triggerResolverSupport).toBe("valid");
    expect(newEventStepsPollingTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(
      newEventStepsPollingTrigger.triggerResolver?.resolveItems,
    ).toBeInstanceOf(Function);
  });

  it("says it emits new records only", () => {
    expect(newEventStepsPollingTrigger.display.label).toBe("New Event Steps");
    expect(newEventStepsPollingTrigger.display.description).toMatch(
      /new event steps only/,
    );
  });

  it("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(newEventStepsPollingTrigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
      "businessProcess",
      "stepType",
    ]);
  });

  it("resolves a realistic payload into tagged items", () => {
    const items = newEventStepsPollingTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: { created: [today] } } } } as never,
    );
    expect(items).toEqual([{ changeType: "created", record: today }]);
  });
});

describe("newEventStepsPollingTrigger perform", () => {
  it("filters by creation date only and records a baseline on a first run", async () => {
    mockSteps({ createdOnOrAfter: "2026-10-14" }, [yesterday, today]);
    const result = await newEventStepsPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body).toEqual({ data: { created: [] } });
    expect((result as PollResult).polledNoChanges).toBe(true);
    expect(store.state).toEqual({ lastPolledAt: NOW, seen: ["s1", "s2"] });
  });

  it("delivers every step from the Look-back Date on an initial sync", async () => {
    mockSteps({ createdOnOrAfter: "2026-01-01" }, [yesterday, today]);
    const result = await newEventStepsPollingTrigger.perform(
      context(),
      noPayload,
      {
        ...params,
        lookBackDate: "2026-01-01T00:00:00.000Z",
      },
    );
    expect(result.payload.body).toEqual({
      data: { created: [yesterday, today] },
    });
  });

  it("delivers only steps not seen in the overlap and drops IDs that left the window", async () => {
    store.state = {
      lastPolledAt: "2026-10-15T08:00:00.000Z",
      seen: ["s1", "s2"],
    };
    mockSteps({ createdOnOrAfter: "2026-10-14" }, [yesterday, today, later]);
    const result = await newEventStepsPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body).toEqual({ data: { created: [later] } });
    expect(store.state).toEqual({
      lastPolledAt: NOW,
      seen: ["s1", "s2", "s3"],
    });

    vi.setSystemTime(new Date("2026-10-16T12:00:00.000Z"));
    const tomorrow = step("s4", "2026-10-16");
    mockSteps({ createdOnOrAfter: "2026-10-14" }, [
      yesterday,
      today,
      later,
      tomorrow,
    ]);
    const next = await newEventStepsPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(next.payload.body).toEqual({ data: { created: [tomorrow] } });
    expect(store.state?.seen).toEqual(["s2", "s3", "s4"]);
  });

  it("sends the Business Process and Step Type filters as repeated parameters", async () => {
    mockSteps(
      {
        createdOnOrAfter: "2026-10-14",
        businessProcess: ["bp1", "bp2"],
        stepType: "st1",
      },
      [],
    );
    await newEventStepsPollingTrigger.perform(context(), noPayload, {
      ...params,
      businessProcess: ["bp1", "bp2"],
      stepType: ["st1"],
    });
  });

  it("reads every page until the total is reached", async () => {
    store.state = { lastPolledAt: NOW, seen: [] };
    const page1 = Array.from({ length: 100 }, (_, i) =>
      step(`p${i}`, "2026-10-15"),
    );
    mockSteps({ createdOnOrAfter: "2026-10-14" }, page1, 101);
    nock(TEST_HOST)
      .get(STEPS_PATH)
      .query({ createdOnOrAfter: "2026-10-14", limit: "100", offset: "100" })
      .reply(200, { total: 101, data: [later] });
    const result = await newEventStepsPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(
      (result.payload.body.data as { created: unknown[] }).created,
    ).toHaveLength(101);
  });

  it("surfaces a Workday error and keeps the stored state", async () => {
    store.state = { lastPolledAt: NOW, seen: ["s1"] };
    nock(TEST_HOST)
      .get(STEPS_PATH)
      .query(true)
      .reply(403, { error: "Forbidden" });
    await expect(
      newEventStepsPollingTrigger.perform(context(), noPayload, params),
    ).rejects.toThrow();
    expect(store.state).toEqual({ lastPolledAt: NOW, seen: ["s1"] });
  });
});
