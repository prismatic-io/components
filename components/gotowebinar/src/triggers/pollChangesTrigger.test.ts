import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { gotoWebinarOAuth2Connection } from "../connections";
import {
  LIST_REGISTRANTS_EXAMPLE_PAYLOAD,
  pollChangesTriggerExamplePayload,
} from "../examplePayloads";
import type {
  ParsedRegistrant,
  PollingChangesObject,
  PollingState,
} from "../types";
import {
  lookBackDateClean,
  lookBackDateToCursor,
  resolvePollingRecordChanges,
} from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const registrant: ParsedRegistrant = {
  lastName: "Rivera",
  email: "ana.rivera@example.com",
  firstName: "Ana",
  registrantKey: "5952035429414193664",
  registrationDate: "2026-03-04T15:22:11Z",
  status: "APPROVED",
  joinUrl: "https://global.gotowebinar.com/join/1234567890/5952035429414193664",
  timeZone: "America/New_York",
};
test("New Registrants is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolvePollingRecordChanges tags every registrant as created", () => {
  expect(resolvePollingRecordChanges({ created: [registrant] })).toEqual([
    { changeType: "created", record: registrant },
  ]);
});
test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
  expect(resolvePollingRecordChanges({ created: [] })).toEqual([]);
  expect(resolvePollingRecordChanges(undefined)).toEqual([]);
});
test("resolvePollingRecordChanges tolerates an envelope with the created array absent", () => {
  expect(resolvePollingRecordChanges({} as PollingChangesObject)).toEqual([]);
});
test("resolveItems flattens the payload shape perform actually returns", () => {
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [registrant] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "created", record: registrant }]);
});
describe("lookBackDateClean", () => {
  test("returns an empty string for an empty value", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  test("returns a valid past date trimmed", () => {
    expect(lookBackDateClean(" 2026-01-01 ")).toBe("2026-01-01");
  });
  test("rejects a malformed, non-calendar, or future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be in YYYY-MM-DD format.",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "is not a valid calendar date",
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date.",
    );
  });
});
test("lookBackDateToCursor admits a registrant registered at midnight UTC", () => {
  const cursor = lookBackDateToCursor("2026-01-01");
  expect(new Date("2026-01-01T00:00:00.000Z").getTime()).toBeGreaterThan(
    new Date(cursor).getTime(),
  );
  expect(new Date("2025-12-31T23:59:59.999Z").getTime()).toBe(
    new Date(cursor).getTime(),
  );
});
test("offers the Look-back Date directly below the required inputs", () => {
  expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
    "connection",
    "webinarKey",
    "lookBackDate",
  ]);
});
const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};
test("resolveItems flattens the documented example payload into batchable items", () => {
  const items =
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload: pollChangesTriggerExamplePayload.payload,
    }) ?? [];
  expect(items).toEqual([
    {
      changeType: "created",
      record: LIST_REGISTRANTS_EXAMPLE_PAYLOAD.data[0],
    },
  ]);
  const batchSize = pollChangesTrigger.batchConfig?.batchSize ?? 0;
  expect(chunk(items, batchSize)).toEqual([items]);
});
describe("pollChangesTrigger perform", () => {
  const BASE = "https://api.getgo.com/G2W/rest/v2";
  const ORGANIZER_KEY = "1234567890";
  const WEBINAR_KEY = "8978964909939938573";
  const REGISTRANTS_PATH = `/organizers/${ORGANIZER_KEY}/webinars/${WEBINAR_KEY}/registrants`;
  const NOW = "2026-06-02T12:00:00.000Z";
  const WIRE_KEYS = ["5952035429414193664", "6123456789012345678"];
  const wireRegistrants = (): string =>
    WIRE_KEYS.reduce(
      (body, key, index) => body.replace(`"__KEY_${index}__"`, key),
      JSON.stringify(
        LIST_REGISTRANTS_EXAMPLE_PAYLOAD.data.map((registrant, index) => ({
          ...registrant,
          registrantKey: `__KEY_${index}__`,
        })),
      ),
    );
  const [firstRegistrant, secondRegistrant] =
    LIST_REGISTRANTS_EXAMPLE_PAYLOAD.data.map((registrant, index) => ({
      ...registrant,
      registrantKey: WIRE_KEYS[index],
    }));
  const connection = createConnection(
    gotoWebinarOAuth2Connection,
    { organizerKey: ORGANIZER_KEY },
    { access_token: "test-token" },
  );
  let store: PollingState;
  const setState = vi.fn((next: PollingState) => {
    store = next;
  });
  const polling = {
    getState: () => store,
    setState,
  };
  const mockRegistrantsPage = () =>
    nock(BASE)
      .get(REGISTRANTS_PATH)
      .query({ page: "0", limit: "200" })
      .reply(200, wireRegistrants());
  const poll = (lookBackDate = "") =>
    invokeTrigger(
      pollChangesTrigger as never,
      { polling } as never,
      undefined,
      { connection, webinarKey: WEBINAR_KEY, lookBackDate } as never,
    );
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  beforeEach(() => {
    store = {};
    setState.mockClear();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("advances the cursor and emits only registrants after it", async () => {
    store = { lastPolledAt: "2024-08-25T00:00:00.000Z" };
    const scope = mockRegistrantsPage();
    const { result } = await poll();
    expect(scope.isDone()).toBe(true);
    expect(setState).toHaveBeenCalledWith({ lastPolledAt: NOW });
    expect(result?.payload.body.data).toEqual({ created: [secondRegistrant] });
    expect(result).toMatchObject({ polledNoChanges: false });
  });
  test("does not re-emit registrants a previous poll already returned", async () => {
    store = { lastPolledAt: "2024-08-25T00:00:00.000Z" };
    mockRegistrantsPage();
    await poll();
    vi.setSystemTime(new Date("2026-06-02T12:05:00.000Z"));
    const scope = mockRegistrantsPage();
    const { result } = await poll();
    expect(scope.isDone()).toBe(true);
    expect(result?.payload.body.data).toEqual({ created: [] });
    expect(result).toMatchObject({ polledNoChanges: true });
    expect(store).toEqual({ lastPolledAt: "2026-06-02T12:05:00.000Z" });
  });
  test("seeds the first poll from the Look-back Date when there is no state", async () => {
    const scope = mockRegistrantsPage();
    const { result } = await poll("2024-08-24");
    expect(scope.isDone()).toBe(true);
    expect(result?.payload.body.data).toEqual({
      created: [firstRegistrant, secondRegistrant],
    });
    expect(store).toEqual({ lastPolledAt: NOW });
  });
  test("excludes registrants registered before the Look-back Date", async () => {
    mockRegistrantsPage();
    const { result } = await poll("2024-08-25");
    expect(result?.payload.body.data).toEqual({ created: [secondRegistrant] });
  });
});
