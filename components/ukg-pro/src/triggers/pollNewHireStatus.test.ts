import {
  createConnection,
  defaultTriggerPayload,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ukgProBasicAuth } from "../connections";
import {
  getCompletedNewHiresExamplePayload,
  getInProgressNewHiresExamplePayload,
} from "../examplePayloads";
import type {
  InProgressNewHire,
  NewHireStatusChange,
  NewHireStatusPollingState,
} from "../types";
import { resolveNewHireStatusChanges } from "../util";
import { pollNewHireStatus } from "./pollNewHireStatus";
const BASE = "https://service5.ultipro.com";
const TENANT = "ACME_CORP";
const IN_PROGRESS = `/talent/onboarding/v2/tenants/${TENANT}/new-hires/in-progress`;
const COMPLETED = `/talent/onboarding/v2/tenants/${TENANT}/new-hires/completed`;
const NOW = "2026-10-01T12:00:00.000Z";
const connection = createConnection(ukgProBasicAuth, {
  baseUrl: BASE,
  customerApiKey: "test-customer-key",
  username: "test-user",
  password: "test-password",
  tenantIdentifier: TENANT,
});
const inProgress =
  getInProgressNewHiresExamplePayload.data as unknown as InProgressNewHire[];
const completed =
  getCompletedNewHiresExamplePayload.data as unknown as InProgressNewHire[];
const allHires = [...inProgress, ...completed];
const added = (
  hire: InProgressNewHire,
  detectedAt: string,
): NewHireStatusChange => ({
  newHireId: hire.id,
  firstName: hire.contactInformation.name.first,
  lastName: hire.contactInformation.name.last,
  changeType: "NewHireAdded",
  currentStatus: hire.onboardingStatus,
  currentProgress: 0,
  detectedAt,
});
const chunk = <T>(items: T[], size: number): T[][] => {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    batches.push(items.slice(i, i + size));
  return batches;
};
describe("pollNewHireStatus batching declaration", () => {
  test("declares opt-in Tier 1 batching with a default batch size", () => {
    expect(pollNewHireStatus.triggerResolverSupport).toBe("valid");
    expect(pollNewHireStatus.batchConfig).toEqual({ batchSize: 50 });
    expect(pollNewHireStatus.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("offers only the connection input", () => {
    expect(Object.keys(pollNewHireStatus.inputs ?? {})).toEqual(["connection"]);
  });
});
describe("resolveNewHireStatusChanges", () => {
  test("tags every status change with its own change type", () => {
    const changes: NewHireStatusChange[] = [
      added(inProgress[0], NOW),
      {
        ...added(completed[0], NOW),
        changeType: "StatusChange",
        previousStatus: "Launched",
        previousProgress: 0,
      },
    ];
    expect(resolveNewHireStatusChanges(changes)).toEqual([
      { changeType: "NewHireAdded", record: changes[0] },
      { changeType: "StatusChange", record: changes[1] },
    ]);
  });
  test("tolerates an absent envelope and an empty one", () => {
    expect(resolveNewHireStatusChanges(undefined)).toEqual([]);
    expect(resolveNewHireStatusChanges([])).toEqual([]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens a realistic trigger payload into tagged items, batched by batchSize", () => {
    const data = allHires.map((hire) => added(hire, NOW));
    const items =
      pollNewHireStatus.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data } } } as never,
      ) ?? [];
    expect(items).toEqual(
      data.map((record) => ({ changeType: "NewHireAdded", record })),
    );
    const batches = chunk(
      items as unknown[],
      pollNewHireStatus.batchConfig?.batchSize ?? 1,
    );
    expect(batches.flat()).toHaveLength(allHires.length);
  });
});
describe("pollNewHireStatus polling state", () => {
  let store: NewHireStatusPollingState;
  type PerformContext = Parameters<typeof pollNewHireStatus.perform>[0];
  type PerformPayload = Parameters<typeof pollNewHireStatus.perform>[1];
  type PerformParams = Parameters<typeof pollNewHireStatus.perform>[2];
  const context = () =>
    ({
      polling: {
        getState: () => store,
        setState: (next: NewHireStatusPollingState) => {
          store = next;
        },
      },
      debug: { enabled: false },
      logger: loggerMock(),
    }) as unknown as PerformContext;
  const poll = async (params: PerformParams) => ({
    result: await pollNewHireStatus.perform(
      context(),
      defaultTriggerPayload() as PerformPayload,
      params,
    ),
  });
  const mockHires = (
    inProgressBody: unknown = getInProgressNewHiresExamplePayload,
    completedBody: unknown = getCompletedNewHiresExamplePayload,
  ) => {
    nock(BASE)
      .get(IN_PROGRESS)
      .query({ page: "1", per_page: "100" })
      .reply(200, inProgressBody as nock.Body);
    nock(BASE)
      .get(COMPLETED)
      .query({ page: "1", per_page: "100" })
      .reply(200, completedBody as nock.Body);
  };
  beforeEach(() => {
    store = {};
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("the first poll reports every hire as added and saves the status map", async () => {
    mockHires();
    const { result } = await poll({
      connection,
    });
    expect(nock.isDone()).toBe(true);
    expect(result?.payload.body.data).toEqual(
      allHires.map((hire) => added(hire, NOW)),
    );
    expect(result?.payload.body).toMatchObject({
      inProgressCount: inProgress.length,
      completedCount: completed.length,
    });
    expect(result?.polledNoChanges).toBe(false);
    expect(store).toEqual({
      lastStatusMap: Object.fromEntries(
        allHires.map((hire) => [
          hire.id,
          { status: hire.onboardingStatus, progress: 0 },
        ]),
      ),
      lastPollTime: NOW,
    });
  });
  test("a second poll with unchanged hires reports no changes", async () => {
    mockHires();
    await poll({ connection });
    vi.setSystemTime(new Date("2026-10-01T12:05:00.000Z"));
    mockHires();
    const { result } = await poll({
      connection,
    });
    expect(result?.payload.body.data).toEqual([]);
    expect(result?.polledNoChanges).toBe(true);
    expect(store.lastPollTime).toBe("2026-10-01T12:05:00.000Z");
  });
  test("a hire whose onboarding status changed is reported once as a StatusChange", async () => {
    mockHires();
    await poll({ connection });
    const later = "2026-10-01T12:05:00.000Z";
    vi.setSystemTime(new Date(later));
    const changed = structuredClone(getInProgressNewHiresExamplePayload);
    const target = changed.data[0];
    const previousStatus = target.onboardingStatus;
    target.onboardingStatus = "Completed";
    mockHires(changed);
    const { result } = await poll({
      connection,
    });
    expect(result?.payload.body.data).toEqual([
      {
        newHireId: target.id,
        firstName: target.contactInformation.name.first,
        lastName: target.contactInformation.name.last,
        changeType: "StatusChange",
        previousStatus,
        currentStatus: "Completed",
        previousProgress: 0,
        currentProgress: 0,
        detectedAt: later,
      },
    ]);
    expect(result?.polledNoChanges).toBe(false);
    expect(store.lastStatusMap?.[target.id]).toEqual({
      status: "Completed",
      progress: 0,
    });
  });
});
