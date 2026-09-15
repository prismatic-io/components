import { afterEach, describe, expect, test, vi } from "vitest";
import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pollChangesTrigger } from "./pollChangesTrigger";
import { calendlyOauth2Connection } from "../connections";
import { resolvePollingRecordChanges } from "../util";
import type { CalendlyEvent } from "../types";
import { LIVE_API_URL } from "../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
const createPollingContext = (state: Record<string, unknown> | null) => {
  let pollingState = state;
  return {
    polling: {
      getState: vi.fn(() => pollingState),
      setState: vi.fn((s: Record<string, unknown>) => {
        pollingState = s;
      }),
    },
    debug: { enabled: false },
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      log: vi.fn(),
      metric: vi.fn(),
      trace: vi.fn(),
    },
  };
};
const params = {
  connection: conn,
  organization: "https://api.calendly.com/organizations/ORG1",
  user: undefined,
  lookBackDate: undefined as string | undefined,
  showNewRecords: true,
  showUpdatedRecords: true,
};
describe("pollChangesTrigger", () => {
  afterEach(() => nock.cleanAll());
  test("first poll bootstraps cursor and returns empty created/updated", async () => {
    const ctx = createPollingContext(null);
    const payload = defaultTriggerPayload();
    const result = (await pollChangesTrigger.perform(
      ctx as unknown as Parameters<typeof pollChangesTrigger.perform>[0],
      payload,
      params as Parameters<typeof pollChangesTrigger.perform>[2],
    )) as {
      payload: typeof payload;
      polledNoChanges: boolean;
    };
    const data = result.payload.body.data as {
      created: unknown[];
      updated: unknown[];
    };
    expect(data.created).toEqual([]);
    expect(data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(ctx.polling.setState).toHaveBeenCalled();
  });
  test("subsequent poll classifies events as created or updated", async () => {
    const now = new Date();
    const recentDate = new Date(now.getTime() + 60000).toISOString();
    const oldDate = "2020-01-01T00:00:00.000Z";
    const events = [
      {
        uri: "https://api.calendly.com/scheduled_events/NEW1",
        name: "New Meeting",
        created_at: recentDate,
        updated_at: recentDate,
      },
      {
        uri: "https://api.calendly.com/scheduled_events/UPD1",
        name: "Updated Meeting",
        created_at: oldDate,
        updated_at: recentDate,
      },
      {
        uri: "https://api.calendly.com/scheduled_events/OLD1",
        name: "Old Meeting",
        created_at: oldDate,
        updated_at: oldDate,
      },
    ];
    nock(BASE)
      .get("/scheduled_events")
      .query(true)
      .reply(200, {
        collection: events,
        pagination: { next_page_token: null },
      });
    const ctx = createPollingContext({ lastPolledAt: now.toISOString() });
    const payload = defaultTriggerPayload();
    const result = (await pollChangesTrigger.perform(
      ctx as unknown as Parameters<typeof pollChangesTrigger.perform>[0],
      payload,
      params as Parameters<typeof pollChangesTrigger.perform>[2],
    )) as {
      payload: typeof payload;
      polledNoChanges: boolean;
    };
    const data = result.payload.body.data as {
      created: {
        uri: string;
      }[];
      updated: {
        uri: string;
      }[];
    };
    expect(data.created).toHaveLength(1);
    expect(data.created[0].uri).toBe(
      "https://api.calendly.com/scheduled_events/NEW1",
    );
    expect(data.updated).toHaveLength(1);
    expect(data.updated[0].uri).toBe(
      "https://api.calendly.com/scheduled_events/UPD1",
    );
    expect(result.polledNoChanges).toBe(false);
  });
});
describe("pollChangesTrigger batching", () => {
  test("New and Updated Events is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    const created: CalendlyEvent = {
      uri: "https://api.calendly.com/scheduled_events/NEW1",
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
    };
    const updated: CalendlyEvent = {
      uri: "https://api.calendly.com/scheduled_events/UPD1",
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2026-01-02T00:00:00.000Z",
    };
    expect(
      resolvePollingRecordChanges({
        created: [created],
        updated: [updated],
      }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolvePollingRecordChanges tolerates an absent array", () => {
    const created: CalendlyEvent = {
      uri: "https://api.calendly.com/scheduled_events/NEW1",
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
    };
    const updated: CalendlyEvent = {
      uri: "https://api.calendly.com/scheduled_events/UPD1",
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2026-01-02T00:00:00.000Z",
    };
    expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const created: CalendlyEvent = {
      uri: "https://api.calendly.com/scheduled_events/NEW1",
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
    };
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [created], updated: [] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});
