import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  workdayOAuth2Connection,
  workdayRefreshTokenConnection,
} from "./connections";

export const TEST_HOST = "https://wd.example.com";

export const refreshTokenTestConnection = () =>
  createConnection(workdayRefreshTokenConnection, {
    restApiUrl: `${TEST_HOST}/ccx/api/v1/acme`,
    clientId: "cid",
    clientSecret: "csecret",
    refreshToken: "good-rt",
    tokenUrl: "",
  });

export const oauthTestConnection = () =>
  createConnection(
    workdayOAuth2Connection,
    { apiUrl: `${TEST_HOST}/ccx` },
    { access_token: "oauth-token" },
  );

export const mockTokenExchange = (accessToken = "at-1") =>
  nock(TEST_HOST)
    .post("/ccx/oauth2/acme/token")
    .reply(200, { access_token: accessToken, token_type: "Bearer" });

export const parseJsonDataPart = (body: string): unknown => {
  const match = body.match(
    /name="jsonData"\r\nContent-Type: application\/json\r\n\r\n([\s\S]*?)\r\n--/,
  );
  return match ? JSON.parse(match[1]) : undefined;
};

export const createPollingContext = <TContext>(
  store: { state?: Record<string, unknown> },
  { batching = false }: { batching?: boolean } = {},
): TContext =>
  ({
    polling: {
      getState: () => store.state,
      setState: (next: Record<string, unknown>) => {
        store.state = next;
      },
    },
    batch: { enabled: batching },
    debug: { enabled: false },
    logger: { debug: () => undefined, warn: () => undefined },
  }) as unknown as TContext;
