import type {
  Connection,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import pollOrdersQuery from "../actions/graphql/queries/orders/PollOrders.gql";
import type {
  PollingCursor,
  PollingState,
} from "../actions/interfaces/PollingState";
import { DEFAULT_SHOPIFY_GRAPHQL_API_VERSION } from "../constants";
import type { PollingResource } from "../triggers/pollingTypes";
import { runPollingCycle } from "./index";
const HOST = "test-store.myshopify.com";
const PATH = `/admin/api/${DEFAULT_SHOPIFY_GRAPHQL_API_VERSION}/graphql.json`;
const connection = {
  key: "shopifyConnection",
  fields: { host: HOST, adminApiAccessToken: "shpat_test" },
} as unknown as Connection;
const ordersResource: PollingResource = {
  listKey: "orders",
  query: pollOrdersQuery,
};
interface TestOrder extends Record<string, unknown> {
  id: string;
  createdAt: string;
}
const oldOrder: TestOrder = {
  id: "gid://shopify/Order/1",
  createdAt: "2020-01-01T00:00:00.000Z",
};
const newOrder: TestOrder = {
  id: "gid://shopify/Order/2",
  createdAt: "2026-08-25T00:00:00.000Z",
};
const createContext = (state: PollingState) => {
  const setState = jest.fn();
  const context = {
    polling: { getState: () => state, setState, invokeAction: jest.fn() },
    logger: {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      metric: jest.fn(),
    },
    debug: { enabled: false },
  } as unknown as PollingContext;
  return { context, setState };
};
const mockPage = (page: {
  nodes: TestOrder[];
  hasNextPage: boolean;
  endCursor: string | null;
}) => {
  const sent: {
    variables?: Record<string, unknown>;
  } = {};
  nock(`https://${HOST}`)
    .post(PATH, (body) => {
      sent.variables = body.variables;
      return true;
    })
    .reply(200, {
      data: {
        orders: {
          nodes: page.nodes,
          pageInfo: {
            hasNextPage: page.hasNextPage,
            endCursor: page.endCursor,
          },
        },
      },
    });
  return sent;
};
const run = (
  state: PollingState,
  lookBackDate = "",
  payload: TriggerPayload = defaultTriggerPayload(),
) =>
  runPollingCycle<TestOrder>(
    createContext(state).context,
    payload,
    { shopifyConnection: connection, lookBackDate },
    ordersResource,
  );
beforeEach(() => {
  nock.cleanAll();
  nock.disableNetConnect();
});
afterEach(() => {
  nock.enableNetConnect();
});
describe("runPollingCycle", () => {
  test("a first run with no look-back date issues no request and commits its starting position", async () => {
    const { context, setState } = createContext({});
    const result = await runPollingCycle<TestOrder>(
      context,
      defaultTriggerPayload(),
      { shopifyConnection: connection, lookBackDate: "" },
      ordersResource,
    );
    expect(result.polledNoChanges).toBe(true);
    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0].lastPolledAt).toEqual(expect.any(String));
    expect(setState.mock.calls[0][0].cursor).toBeUndefined();
  });
  test("a first run with a look-back date queries the historical window", async () => {
    const sent = mockPage({
      nodes: [oldOrder],
      hasNextPage: false,
      endCursor: "C1",
    });
    const result = await run({}, "2026-01-01T00:00:00.000Z");
    expect(sent.variables?.query).toContain(
      "updated_at:>='2026-01-01T00:00:00.000Z'",
    );
    expect(sent.variables?.query).toContain("updated_at:<'");
    expect(sent.variables?.cursor).toBeUndefined();
    expect(result.payload.body.data).toEqual({
      created: [],
      updated: [oldOrder],
    });
  });
  test("a non-final page keeps the committed watermark where it was", async () => {
    const priorState: PollingState = {
      lastPolledAt: "2026-08-24T00:00:00.000Z",
    };
    const { context, setState } = createContext(priorState);
    mockPage({ nodes: [newOrder], hasNextPage: true, endCursor: "CURSOR-1" });
    const result = await runPollingCycle<TestOrder>(
      context,
      defaultTriggerPayload(),
      { shopifyConnection: connection, lookBackDate: "" },
      ordersResource,
    );
    const written = setState.mock.calls[0][0] as PollingState;
    expect(written.lastPolledAt).toBe("2026-08-24T00:00:00.000Z");
    expect(written.cursor?.after).toBe("CURSOR-1");
    expect(written.cursor?.windowStart).toBe("2026-08-24T00:00:00.000Z");
    expect(
      (
        result.payload as {
          paginationState?: PollingCursor;
        }
      ).paginationState?.after,
    ).toBe("CURSOR-1");
  });
  test("the final page commits the window end and drops the cursor", async () => {
    const priorState: PollingState = {
      lastPolledAt: "2026-08-24T00:00:00.000Z",
    };
    const { context, setState } = createContext(priorState);
    mockPage({ nodes: [newOrder], hasNextPage: false, endCursor: "CURSOR-2" });
    const result = await runPollingCycle<TestOrder>(
      context,
      defaultTriggerPayload(),
      { shopifyConnection: connection, lookBackDate: "" },
      ordersResource,
    );
    const written = setState.mock.calls[0][0] as PollingState;
    expect(written.cursor).toBeUndefined();
    expect(written.lastPolledAt).not.toBe("2026-08-24T00:00:00.000Z");
    expect(
      (
        result.payload as {
          paginationState?: PollingCursor;
        }
      ).paginationState,
    ).toBeUndefined();
  });
  test("the first drain persists a usable lower bound even before any watermark is committed", async () => {
    const { context, setState } = createContext({});
    mockPage({ nodes: [oldOrder], hasNextPage: true, endCursor: "CURSOR-A" });
    await runPollingCycle<TestOrder>(
      context,
      defaultTriggerPayload(),
      {
        shopifyConnection: connection,
        lookBackDate: "2026-01-01T00:00:00.000Z",
      },
      ordersResource,
    );
    const written = setState.mock.calls[0][0] as PollingState;
    expect(written.lastPolledAt).toBe("2026-01-01T00:00:00.000Z");
    expect(written.cursor?.after).toBe("CURSOR-A");
  });
  test("an interrupted drain resumes from the stored cursor instead of restarting", async () => {
    const storedCursor: PollingCursor = {
      windowStart: "2026-08-20T00:00:00.000Z",
      windowEnd: "2026-08-24T00:00:00.000Z",
      after: "CURSOR-9",
      isBackfill: false,
    };
    const { context } = createContext({
      lastPolledAt: "2026-08-19T00:00:00.000Z",
      cursor: storedCursor,
    });
    const sent = mockPage({ nodes: [], hasNextPage: false, endCursor: null });
    await runPollingCycle<TestOrder>(
      context,
      defaultTriggerPayload(),
      { shopifyConnection: connection, lookBackDate: "" },
      ordersResource,
    );
    expect(sent.variables?.cursor).toBe("CURSOR-9");
    expect(sent.variables?.query).toBe(
      "updated_at:>='2026-08-20T00:00:00.000Z' updated_at:<'2026-08-24T00:00:00.000Z'",
    );
  });
  test("classification anchors on the window start, not on the page", async () => {
    const priorState: PollingState = {
      lastPolledAt: "2026-08-24T00:00:00.000Z",
    };
    const { context } = createContext(priorState);
    mockPage({
      nodes: [oldOrder, newOrder],
      hasNextPage: false,
      endCursor: "C3",
    });
    const result = await runPollingCycle<TestOrder>(
      context,
      defaultTriggerPayload(),
      { shopifyConnection: connection, lookBackDate: "" },
      ordersResource,
    );
    expect(result.payload.body.data).toEqual({
      created: [newOrder],
      updated: [oldOrder],
    });
  });
});
