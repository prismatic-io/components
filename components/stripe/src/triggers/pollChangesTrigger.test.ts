import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../connections/apiKey";
import { pollChangesTrigger } from "./pollChangesTrigger";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const context = (values: Record<string, unknown>) => values as never;
const params = (values: Record<string, unknown>) => values as never;
const pollingContext = (initial?: Record<string, unknown>) => {
  let state: Record<string, unknown> = initial ?? {};
  return {
    polling: {
      getState: () => state,
      setState: (next: Record<string, unknown>) => {
        state = next;
      },
      invokeAction: async () => ({ data: null }),
    },
    read: () => state,
  };
};
const createdEvent = {
  id: "evt_created_1",
  object: "event",
  type: "customer.created",
  created: 1716397800,
  data: { object: { id: "cus_1", object: "customer" } },
};
const updatedEvent = {
  id: "evt_updated_1",
  object: "event",
  type: "invoice.paid",
  created: 1716397900,
  data: { object: { id: "in_1", object: "invoice" } },
};
const eventsPage = (data: unknown[], hasMore: boolean) => ({
  object: "list",
  url: "/v1/events",
  has_more: hasMore,
  data,
});
interface PollResult {
  payload: {
    body: {
      data: {
        created: Array<{
          id: string;
        }>;
        updated: Array<{
          id: string;
        }>;
      };
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  polling: ReturnType<typeof pollingContext>,
  inputs: Record<string, unknown> = {},
) => {
  const { result, loggerMock } = await invokeTrigger(
    pollChangesTrigger as never,
    context(polling),
    defaultTriggerPayload(),
    params({ connection: conn, ...inputs }),
  );
  return { result: result as unknown as PollResult, loggerMock };
};
const buckets = (result: PollResult) => result.payload.body.data;
afterEach(() => nock.cleanAll());
describe("pollChangesTrigger cursor advancement", () => {
  it("advances the cursor to now on a poll that was not truncated", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .reply(200, eventsPage([createdEvent], false));
    const polling = pollingContext({
      lastPolledAt: "2024-01-01T00:00:00.000Z",
    });
    await poll(polling);
    const { lastPolledAt } = polling.read() as {
      lastPolledAt: string;
    };
    expect(lastPolledAt).not.toBe("2024-01-01T00:00:00.000Z");
    expect(new Date(lastPolledAt).getTime()).toBeGreaterThan(
      new Date("2024-01-01T00:00:00.000Z").getTime(),
    );
  });
  it("holds the cursor at lastPolledAt when the page cap truncates the poll, and warns", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .times(100)
      .reply(200, eventsPage([createdEvent], true));
    const polling = pollingContext({
      lastPolledAt: "2024-01-01T00:00:00.000Z",
    });
    const { loggerMock } = await poll(polling);
    expect(polling.read()).toEqual({
      lastPolledAt: "2024-01-01T00:00:00.000Z",
    });
    expect(loggerMock.warn).toHaveBeenCalledWith(
      expect.stringContaining("Holding the cursor at 2024-01-01T00:00:00.000Z"),
    );
  });
  it("re-emits events on the next poll while the window stays truncated", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .times(200)
      .reply(200, eventsPage([createdEvent], true));
    const polling = pollingContext({
      lastPolledAt: "2024-01-01T00:00:00.000Z",
    });
    const first = await poll(polling);
    const second = await poll(polling);
    expect(buckets(first.result).created[0].id).toBe("evt_created_1");
    expect(buckets(second.result).created[0].id).toBe("evt_created_1");
    expect(polling.read()).toEqual({
      lastPolledAt: "2024-01-01T00:00:00.000Z",
    });
  });
});
describe("pollChangesTrigger partitioning", () => {
  it("partitions events on the .created suffix", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .reply(200, eventsPage([createdEvent, updatedEvent], false));
    const polling = pollingContext();
    const { result } = await poll(polling);
    const { created, updated } = buckets(result);
    expect(created.map((event) => event.id)).toEqual(["evt_created_1"]);
    expect(updated.map((event) => event.id)).toEqual(["evt_updated_1"]);
  });
  it("drops the created bucket when Show New Records is off", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .reply(200, eventsPage([createdEvent, updatedEvent], false));
    const polling = pollingContext();
    const { result } = await poll(polling, { showNewRecords: false });
    const { created, updated } = buckets(result);
    expect(created).toEqual([]);
    expect(updated.map((event) => event.id)).toEqual(["evt_updated_1"]);
  });
  it("drops the updated bucket when Show Updated Records is off", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .reply(200, eventsPage([createdEvent, updatedEvent], false));
    const polling = pollingContext();
    const { result } = await poll(polling, { showUpdatedRecords: false });
    const { created, updated } = buckets(result);
    expect(created.map((event) => event.id)).toEqual(["evt_created_1"]);
    expect(updated).toEqual([]);
  });
});
describe("pollChangesTrigger polledNoChanges", () => {
  it("reports no changes when Stripe returned no events", async () => {
    nock(BASE).get("/v1/events").query(true).reply(200, eventsPage([], false));
    const polling = pollingContext();
    const { result } = await poll(polling);
    expect(result.polledNoChanges).toBe(true);
    expect(buckets(result)).toEqual({ created: [], updated: [] });
  });
  it("reports no changes when every fetched event was filtered out", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .reply(200, eventsPage([createdEvent, updatedEvent], false));
    const polling = pollingContext();
    const { result } = await poll(polling, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.polledNoChanges).toBe(true);
  });
  it("reports changes when at least one event survived the filters", async () => {
    nock(BASE)
      .get("/v1/events")
      .query(true)
      .reply(200, eventsPage([createdEvent], false));
    const polling = pollingContext();
    const { result } = await poll(polling);
    expect(result.polledNoChanges).toBe(false);
  });
});
