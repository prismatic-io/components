import type { TriggerPayload } from "@prismatic-io/spectral";
import {
  defaultTriggerPayload,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import { pollChangesTrigger } from "./pollChangesTrigger";
import { fetchMessagesSince, resolvePollingRecordChanges } from "../util";
import type { TwilioChangesObject, TwilioMessage } from "../types";

vi.mock("../util", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../util")>()),
  fetchMessagesSince: vi.fn(),
}));

const created: TwilioMessage = {
  body: "Hello",
  numSegments: "1",
  direction: "outbound-api",
  from: "+15558675309",
  to: "+15551234567",
  dateUpdated: new Date("2026-03-15T14:32:10.000Z"),
  price: "-0.00750",
  errorMessage: null,
  uri: "/2010-04-01/Accounts/AC123/Messages/SM123.json",
  accountSid: "AC123",
  numMedia: "0",
  status: "queued",
  messagingServiceSid: null,
  sid: "SM123",
  dateSent: null,
  dateCreated: new Date("2026-03-15T14:32:10.000Z"),
  errorCode: null,
  priceUnit: "USD",
  apiVersion: "2010-04-01",
  subresourceUris: {
    media: "/2010-04-01/Accounts/AC123/Messages/SM123/Media.json",
  },
};

const updated: TwilioMessage = {
  ...created,
  sid: "SM456",
  status: "delivered",
  dateUpdated: new Date("2026-03-15T15:00:00.000Z"),
};

describe("pollChangesTrigger batching declaration", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
});

describe("resolvePollingRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });

  test("returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
});

describe("resolveItems end-to-end", () => {
  test("flattens the payload shape perform actually returns", () => {
    const payload = {
      headers: {},
      queryParameters: {},
      rawBody: { data: null },
      body: { data: { created: [created], updated: [] } },
      pathFragment: "",
      webhookUrls: {},
      webhookApiKeys: {},
      invokeUrl: "",
      executionId: "",
      customer: { id: "", name: "", externalId: "" },
      instance: { id: "", name: "" },
      user: { id: "", email: "", name: "", externalId: "" },
      integration: {
        id: "",
        name: "",
        versionSequenceId: "",
        externalVersion: "",
      },
      flow: { id: "", name: "", stableId: "" },
      startedAt: "",
      globalDebug: false,
    } as unknown as TriggerPayload;

    const result = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload },
    );
    expect(result).toEqual([{ changeType: "created", record: created }]);
  });
});

describe("pollChangesTrigger perform", () => {
  const FROZEN_NOW = "2026-03-20T12:00:00.000Z";

  const makeContext = (state: Record<string, unknown>) => {
    const store = { state };
    const context = {
      debug: { enabled: false },
      logger: loggerMock(),
      polling: {
        getState: () => store.state,
        setState: (next: Record<string, unknown>) => {
          store.state = next;
        },
      },
    } as unknown as Parameters<typeof pollChangesTrigger.perform>[0];
    return { context, store };
  };

  const params = (overrides: Record<string, unknown> = {}) =>
    ({
      connection: {},
      lookBackDate: "",
      from: "",
      to: "",
      showNewRecords: true,
      showUpdatedRecords: true,
      ...overrides,
    }) as unknown as Parameters<typeof pollChangesTrigger.perform>[2];

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(FROZEN_NOW));
    vi.mocked(fetchMessagesSince).mockResolvedValue({
      messages: [created],
      truncated: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.mocked(fetchMessagesSince).mockReset();
  });

  test("initial sync ignores the visibility filters", async () => {
    const { context, store } = makeContext({});

    const result = await pollChangesTrigger.perform(
      context,
      defaultTriggerPayload(),
      params({ lookBackDate: "2026-03-01", showNewRecords: false }),
    );

    const data = result.payload.body.data as TwilioChangesObject;
    expect(data.created).toEqual([created]);
    expect(store.state).toEqual({ lastPolledAt: FROZEN_NOW });
  });

  test("later recurrences still apply the visibility filters", async () => {
    const { context } = makeContext({
      lastPolledAt: "2026-03-10T00:00:00.000Z",
    });

    const result = await pollChangesTrigger.perform(
      context,
      defaultTriggerPayload(),
      params({ lookBackDate: "2026-03-01", showNewRecords: false }),
    );

    const data = result.payload.body.data as TwilioChangesObject;
    expect(data.created).toEqual([]);
  });
});

describe("pollChangesTrigger truncated drain", () => {
  const PAGE_LIMIT = 3;

  const message = (sid: string, sent: string): TwilioMessage => ({
    ...created,
    sid,
    dateSent: new Date(sent),
  });

  const fakeTwilio = (store: TwilioMessage[]) =>
    vi
      .mocked(fetchMessagesSince)
      .mockImplementation(
        async (_connection, after, _debug, _from, _to, before) => {
          const sec = (d: Date) => Math.floor(d.getTime() / 1000);
          const inWindow = store
            .filter((m) => m.dateSent instanceof Date)
            .filter((m) => sec(m.dateSent as Date) >= sec(after))
            .filter((m) => !before || sec(m.dateSent as Date) <= sec(before))
            .sort(
              (a, b) =>
                (b.dateSent as Date).getTime() -
                  (a.dateSent as Date).getTime() || b.sid.localeCompare(a.sid),
            );
          return {
            messages: inWindow.slice(0, PAGE_LIMIT),
            truncated: inWindow.length >= PAGE_LIMIT,
          };
        },
      );

  const runRecurrences = async (
    store: { state: Record<string, unknown> },
    overrides: Record<string, unknown>,
    count: number,
  ) => {
    const sids: string[][] = [];
    for (let i = 0; i < count; i++) {
      const context = {
        debug: { enabled: false },
        logger: loggerMock(),
        polling: {
          getState: () => store.state,
          setState: (next: Record<string, unknown>) => {
            store.state = next;
          },
        },
      } as unknown as Parameters<typeof pollChangesTrigger.perform>[0];
      const result = await pollChangesTrigger.perform(
        context,
        defaultTriggerPayload(),
        {
          connection: {},
          lookBackDate: "",
          from: "",
          to: "",
          showNewRecords: true,
          showUpdatedRecords: true,
          ...overrides,
        } as unknown as Parameters<typeof pollChangesTrigger.perform>[2],
      );
      sids.push(
        (result.payload.body.data as TwilioChangesObject).created.map(
          (m) => m.sid,
        ),
      );
      vi.advanceTimersByTime(60_000);
    }
    return sids;
  };

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-03-20T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.mocked(fetchMessagesSince).mockReset();
  });

  test("walks backward through a truncated window, delivering each message once", async () => {
    fakeTwilio([
      message("SM1", "2026-03-02T00:00:01Z"),
      message("SM2", "2026-03-02T00:00:02Z"),
      message("SM3", "2026-03-02T00:00:03Z"),
      message("SM4", "2026-03-02T00:00:04Z"),
      message("SM5", "2026-03-02T00:00:05Z"),
      message("SM6", "2026-03-02T00:00:06Z"),
      message("SM7", "2026-03-02T00:00:07Z"),
    ]);
    const store = { state: {} as Record<string, unknown> };

    const sids = await runRecurrences(
      store,
      { lookBackDate: "2026-03-01", showNewRecords: false },
      5,
    );

    expect(sids).toEqual([
      ["SM7", "SM6", "SM5"],
      ["SM4", "SM3"],
      ["SM2", "SM1"],
      [],
      [],
    ]);
    expect(store.state).toEqual({ lastPolledAt: "2026-03-20T12:04:00.000Z" });
  });

  test("delivers the rest of a second that the page limit split", async () => {
    fakeTwilio([
      message("SM1", "2026-03-02T00:00:02Z"),
      message("SM2", "2026-03-02T00:00:03Z"),
      message("SM3", "2026-03-02T00:00:03Z"),
      message("SM4", "2026-03-02T00:00:04Z"),
      message("SM5", "2026-03-02T00:00:05Z"),
    ]);
    const store = { state: {} as Record<string, unknown> };

    const sids = await runRecurrences(store, { lookBackDate: "2026-03-01" }, 3);

    expect(sids.flat().sort()).toEqual(["SM1", "SM2", "SM3", "SM4", "SM5"]);
    expect(new Set(sids.flat()).size).toBe(5);
    expect(store.state).toEqual({ lastPolledAt: "2026-03-20T12:00:00.000Z" });
  });

  test("steps past a second holding more than one page instead of stalling", async () => {
    fakeTwilio([
      message("SM1", "2026-03-02T00:00:05Z"),
      message("SM2", "2026-03-02T00:00:05Z"),
      message("SM3", "2026-03-02T00:00:05Z"),
      message("SM4", "2026-03-02T00:00:05Z"),
    ]);
    const store = { state: {} as Record<string, unknown> };

    const sids = await runRecurrences(store, { lookBackDate: "2026-03-01" }, 3);

    expect(sids).toEqual([["SM4", "SM3", "SM2"], [], []]);
    expect(store.state).toEqual({ lastPolledAt: "2026-03-20T12:00:00.000Z" });
  });
});
