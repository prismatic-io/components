import type {
  ActionContext,
  Connection,
  Element,
} from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "./connections";
nock.disableNetConnect();
export const RAMP_ORIGIN = "https://api.ramp.com";
export const RAMP_API_PREFIX = "/developer/v1";
export const RAMP_BASE_URL = `${RAMP_ORIGIN}${RAMP_API_PREFIX}/`;
export const RAMP_ACCESS_TOKEN = "test-access-token";
export const testConnection = createConnection(
  oauth2,
  {
    authorizeUrl: "https://app.ramp.com/v1/authorize",
    tokenUrl: `${RAMP_BASE_URL}token`,
    scopes: "transactions:read",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  },
  { access_token: RAMP_ACCESS_TOKEN },
) as unknown as Connection;
export const apiPath = (path: string): string =>
  `${RAMP_API_PREFIX}/${path.replace(/^\/+/, "")}`;
export const rampNock = (): nock.Scope =>
  nock(RAMP_ORIGIN, {
    reqheaders: { authorization: `Bearer ${RAMP_ACCESS_TOKEN}` },
  });
export interface ListReplyBody<T> {
  data: T[];
  page: {
    next: string | null;
  } | null;
}
export const listBody = <T>(records: T[]): ListReplyBody<T> => ({
  data: records,
  page: null,
});
export const emptyListBody = (): ListReplyBody<never> => listBody<never>([]);
export const terminatePaging = <T>(fixture: { data: T[] }): ListReplyBody<T> =>
  listBody(fixture.data);
export interface PaginationInput {
  start: string | undefined;
  pageSize: number | undefined;
}
export const paginationInput = (
  overrides: Partial<PaginationInput> = {},
): PaginationInput => ({
  start: undefined,
  pageSize: undefined,
  ...overrides,
});
export interface ListActionParams {
  connection: Connection;
  fetchAll: boolean;
  pagination: PaginationInput;
  customQueryParams: Record<string, string>;
}
export const listActionParams = (
  overrides: {
    fetchAll?: boolean;
    pagination?: Partial<PaginationInput>;
    customQueryParams?: Record<string, string>;
  } = {},
): ListActionParams => ({
  connection: testConnection,
  fetchAll: overrides.fetchAll ?? false,
  pagination: paginationInput(overrides.pagination),
  customQueryParams: overrides.customQueryParams ?? {},
});
export const asElements = (result: (string | Element)[]): Element[] =>
  result.map((entry) => {
    if (typeof entry === "string") {
      throw new Error(
        `Expected an Element, received the bare string "${entry}"`,
      );
    }
    return entry;
  });
export const elementKeys = (result: (string | Element)[]): string[] =>
  asElements(result).map((element) => element.key);
export const elementLabels = (
  result: (string | Element)[],
): (string | undefined)[] => asElements(result).map((element) => element.label);
export interface PollingStore {
  currentState: () => Record<string, unknown>;
  writes: Record<string, unknown>[];
  context: Partial<ActionContext>;
}
export const createPollingStore = (
  seedState: Record<string, unknown> = {},
): PollingStore => {
  let state: Record<string, unknown> = seedState;
  const writes: Record<string, unknown>[] = [];
  return {
    currentState: () => state,
    writes,
    context: {
      polling: {
        getState: () => state,
        setState: (newState: Record<string, unknown>) => {
          state = newState;
          writes.push(newState);
        },
        invokeAction: () => {
          throw new Error("polling.invokeAction is not stubbed in tests");
        },
      },
    } as unknown as Partial<ActionContext>,
  };
};
export const freezeClockAt = (isoInstant: string): void => {
  jest.useFakeTimers({
    doNotFake: [
      "cancelAnimationFrame",
      "cancelIdleCallback",
      "clearImmediate",
      "clearInterval",
      "clearTimeout",
      "hrtime",
      "nextTick",
      "performance",
      "queueMicrotask",
      "requestAnimationFrame",
      "requestIdleCallback",
      "setImmediate",
      "setInterval",
      "setTimeout",
    ],
  });
  jest.setSystemTime(new Date(isoInstant));
};
export const resetNock = (): void => {
  nock.cleanAll();
};
