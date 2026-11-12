import { createConnection } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { docusignOauthConnection } from "./connections";
import { DEVELOPMENT_API_URL } from "./constants";

export const ACCESS_TOKEN = "test-access-token";
export const ACCOUNT_ID = "a1b2c3d4-0000-4000-8000-000000000001";
export const BASE_URI = "https://demo.docusign.net";
export const ACCOUNTS_PATH = "/restapi/v2.1/accounts";
export const ACCOUNT_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_ID}`;

export const connection = createConnection(
  docusignOauthConnection,
  { useLiveEnvironment: false },
  { access_token: ACCESS_TOKEN },
);

export const mockUserInfo = (): nock.Scope =>
  nock(DEVELOPMENT_API_URL)
    .get("/oauth/userinfo")
    .matchHeader("authorization", `Bearer ${ACCESS_TOKEN}`)
    .reply(200, {
      accounts: [{ account_id: ACCOUNT_ID, base_uri: BASE_URI }],
    });

export const mockApi = (): nock.Scope => {
  mockUserInfo();
  return nock(BASE_URI).matchHeader("authorization", `Bearer ${ACCESS_TOKEN}`);
};

export const useNock = (): void => {
  beforeAll(() => {
    nock.disableNetConnect();
  });
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.enableNetConnect();
  });
};
