import { ORG_BASE_URL } from "./constants";
export const createMockConnection = () =>
  ({
    fields: {
      webApiUrl: ORG_BASE_URL,
    },
    token: {
      access_token: "mock-access-token",
    },
  }) as any;
export const createMockContext = (overrides?: Record<string, unknown>) =>
  ({
    debug: { enabled: false },
    logger: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
    ...overrides,
  }) as any;
