import type { PollingContext, TriggerPayload } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adminApiAccessToken } from "../connections";
import { DEFAULT_SHOPIFY_GRAPHQL_API_VERSION } from "../constants";
import {
  customersPollingTriggerExamplePayload,
  ordersPollingTriggerExamplePayload,
  productsPollingTriggerExamplePayload,
} from "../examplePayloads";
import type { PollingChangesObject, PollingState } from "../types";
import { customersPollingTrigger } from "./customersPollingTrigger";
import { ordersPollingTrigger } from "./ordersPollingTrigger";
import { productsPollingTrigger } from "./productsPollingTrigger";

const BASE = "https://test-store.myshopify.com";
const PATH = `/admin/api/${DEFAULT_SHOPIFY_GRAPHQL_API_VERSION}/graphql.json`;

const shopifyConnection = createConnection(adminApiAccessToken, {
  host: "test-store.myshopify.com",
  adminApiAccessToken: "shpat_test",
});

const SEED = "2026-10-20T00:00:00.000Z";
const FIRST_POLL_AT = "2026-10-21T00:00:00.000Z";
const SECOND_POLL_AT = "2026-10-21T00:05:00.000Z";

type InvokableTrigger = Parameters<typeof invokeTrigger>[0];
type InvokableParams = Parameters<typeof invokeTrigger>[3];

const createStatefulContext = (initial: PollingState) => {
  const store: { state: PollingState } = { state: initial };
  const context = {
    polling: {
      getState: () => store.state,
      setState: (next: PollingState) => {
        store.state = next;
      },
      invokeAction: vi.fn(),
    },
  } as unknown as Partial<PollingContext>;
  return { context, store };
};

const mockFinalPage = (listKey: string, nodes: unknown[]) => {
  const sent: { variables?: Record<string, unknown> } = {};
  nock(BASE)
    .post(PATH, (body) => {
      sent.variables = body.variables;
      return true;
    })
    .reply(200, {
      data: {
        [listKey]: { nodes, pageInfo: { hasNextPage: false, endCursor: null } },
      },
    });
  return sent;
};

const cases: [
  string,
  InvokableTrigger,
  string,
  PollingChangesObject<unknown>,
][] = [
  [
    "customersPollingTrigger",
    customersPollingTrigger as unknown as InvokableTrigger,
    "customers",
    customersPollingTriggerExamplePayload.payload.body
      .data as PollingChangesObject<unknown>,
  ],
  [
    "productsPollingTrigger",
    productsPollingTrigger as unknown as InvokableTrigger,
    "products",
    productsPollingTriggerExamplePayload.payload.body
      .data as PollingChangesObject<unknown>,
  ],
  [
    "ordersPollingTrigger",
    ordersPollingTrigger as unknown as InvokableTrigger,
    "orders",
    ordersPollingTriggerExamplePayload.payload.body
      .data as PollingChangesObject<unknown>,
  ],
];

beforeEach(() => {
  nock.cleanAll();
  nock.disableNetConnect();
  vi.useFakeTimers({ toFake: ["Date"] });
});

afterEach(() => {
  vi.useRealTimers();
  nock.enableNetConnect();
});

describe("polling triggers across sequential polls", () => {
  test.each(
    cases,
  )("%s second poll starts at the first poll's committed window end and redelivers nothing", async (_name, trigger, listKey, example) => {
    const { context, store } = createStatefulContext({ lastPolledAt: SEED });
    const params = {
      shopifyConnection,
      lookBackDate: "",
    } as unknown as InvokableParams;
    const records = [...example.created, ...example.updated];

    vi.setSystemTime(new Date(FIRST_POLL_AT));
    const firstSent = mockFinalPage(listKey, records);
    const first = await invokeTrigger(trigger, context, undefined, params);

    expect(firstSent.variables?.query).toBe(
      `updated_at:>='${SEED}' updated_at:<'${FIRST_POLL_AT}'`,
    );
    expect((first.result?.payload as TriggerPayload).body.data).toEqual(
      example,
    );
    expect(store.state).toEqual({ lastPolledAt: FIRST_POLL_AT });

    vi.setSystemTime(new Date(SECOND_POLL_AT));
    const secondSent = mockFinalPage(listKey, []);
    const second = await invokeTrigger(trigger, context, undefined, params);

    expect(secondSent.variables?.query).toBe(
      `updated_at:>='${FIRST_POLL_AT}' updated_at:<'${SECOND_POLL_AT}'`,
    );
    expect(secondSent.variables?.cursor).toBeUndefined();
    expect((second.result?.payload as TriggerPayload).body.data).toEqual({
      created: [],
      updated: [],
    });
    expect(
      (second.result as { polledNoChanges?: boolean }).polledNoChanges,
    ).toBe(true);
    expect(store.state).toEqual({ lastPolledAt: SECOND_POLL_AT });
  });
});
