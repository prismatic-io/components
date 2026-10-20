import { vi } from "vitest";
export const makeContext = (
  initialState: Record<string, unknown> = {},
  batching = false,
) => {
  const store = { state: initialState as Record<string, unknown> };
  const context = {
    polling: {
      getState: () => store.state,
      setState: (next: Record<string, unknown>) => {
        store.state = next;
      },
    },
    batch: batching ? { enabled: true } : undefined,
    debug: { enabled: false },
    logger: { debug: vi.fn() },
  };
  return { context: context as never, store };
};
export const connection = {
  key: "oktaApiToken",
  fields: { oktaDomainUrl: "example.okta.com", apiToken: "token" },
} as never;
export const emptyPayload = { body: { data: undefined } } as never;
