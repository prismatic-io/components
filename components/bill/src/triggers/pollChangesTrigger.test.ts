import { invokeTrigger, loggerMock } from "@prismatic-io/spectral/dist/testing";
import { getBillExamplePayload } from "../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../testHelpers";
import { pollChangesTrigger } from "./pollChangesTrigger";
const makeContext = (store: { lastPolledAt?: string }) => ({
  debug: { enabled: false },
  logger: loggerMock(),
  polling: {
    getState: () => store,
    setState: (next: { lastPolledAt?: string }) => {
      store.lastPolledAt = next.lastPolledAt;
    },
  },
});
// biome-ignore lint/suspicious/noExplicitAny: test-only context bridge
const asCtx = (c: ReturnType<typeof makeContext>): any => c;
// biome-ignore lint/suspicious/noExplicitAny: test-only trigger-shape bridge
const trigger: any = pollChangesTrigger;
// biome-ignore lint/suspicious/noExplicitAny: test-only params bridge
const baseParams = (overrides: Record<string, unknown> = {}): any => ({
  connection: testConnection,
  pollResourceType: "bills",
  showNewRecords: true,
  showUpdatedRecords: true,
  ...overrides,
});
const parseListBody = (body: string): Record<string, unknown> => {
  const params = new URLSearchParams(body);
  return JSON.parse(params.get("data") ?? "{}");
};
describe("pollChangesTrigger", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("short-circuits without any API call when both toggles are off", async () => {
    const store: {
      lastPolledAt?: string;
    } = {};
    const result = await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined,
      baseParams({ showNewRecords: false, showUpdatedRecords: false }),
    );
    expect(result.result?.polledNoChanges).toBe(true);
    expect(result.result?.payload.body).toEqual({
      data: { created: [], updated: [] },
    });
    expect(store.lastPolledAt).toBeDefined();
  });
  test("splits records into created vs updated via filterByTimestamp", async () => {
    const store: {
      lastPolledAt?: string;
    } = {
      lastPolledAt: "2024-01-01T00:00:00.000Z",
    };
    const createdRecord = {
      ...getBillExamplePayload.data,
      id: "bill-created",
      createdTime: "2024-07-30T23:00:32.000+0000",
      updatedTime: "2024-07-30T23:00:32.000+0000",
    };
    const updatedRecord = {
      ...getBillExamplePayload.data,
      id: "bill-updated",
      createdTime: "2023-01-01T00:00:00.000+0000",
      updatedTime: "2024-08-15T00:00:00.000+0000",
    };
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post("/List/Bill.json")
      .reply(200, envelope([createdRecord, updatedRecord]));
    const result = await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined,
      baseParams(),
    );
    expect(scope.isDone()).toBe(true);
    const data = result.result?.payload.body.data as {
      created: {
        id: string;
      }[];
      updated: {
        id: string;
      }[];
    };
    expect(data.created.map((r) => r.id)).toEqual(["bill-created"]);
    expect(data.updated.map((r) => r.id)).toEqual(["bill-updated"]);
    expect(result.result?.polledNoChanges).toBe(false);
  });
  test("advances state and builds the next filter from the prior lastPolledAt", async () => {
    const store: {
      lastPolledAt?: string;
    } = {
      lastPolledAt: "2024-01-01T00:00:00.000Z",
    };
    let firstFilterValue: unknown;
    let secondFilterValue: unknown;
    mockLogin();
    nock(SANDBOX_BASE)
      .post("/List/Bill.json", (body: string) => {
        const parsed = parseListBody(body);
        firstFilterValue = (
          parsed.filters as {
            field: string;
            value: unknown;
          }[]
        )?.[0]?.value;
        return true;
      })
      .reply(200, envelope([]));
    const before = new Date().toISOString();
    await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined,
      baseParams(),
    );
    const advanced = store.lastPolledAt as string;
    expect(firstFilterValue).toBe("2024-01-01T00:00:00.000Z");
    expect(advanced >= before).toBe(true);
    mockLogin();
    nock(SANDBOX_BASE)
      .post("/List/Bill.json", (body: string) => {
        const parsed = parseListBody(body);
        secondFilterValue = (
          parsed.filters as {
            field: string;
            value: unknown;
          }[]
        )?.[0]?.value;
        return true;
      })
      .reply(200, envelope([]));
    await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined,
      baseParams(),
    );
    expect(secondFilterValue).toBe(advanced);
    expect(store.lastPolledAt).not.toBe(advanced);
  });
});
