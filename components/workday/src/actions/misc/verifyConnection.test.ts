import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  mockTokenExchange,
  oauthTestConnection,
  refreshTokenTestConnection,
  TEST_HOST,
} from "../../testHelpers";
import { clearTokenCache, getAccessToken } from "../../util";
import { verifyConnection } from "./verifyConnection";

const REPORT_PATH = "/ccx/service/customreport2/acme/ISU_Orgvue/People_Report";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
beforeEach(() => clearTokenCache());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});

describe("verifyConnection", () => {
  it("forces a fresh token exchange even when a token is cached", async () => {
    mockTokenExchange("at-1");
    mockTokenExchange("at-2");
    await getAccessToken(refreshTokenTestConnection());

    const { result } = await invoke(verifyConnection, {
      connection: refreshTokenTestConnection(),
      reportUrl: undefined,
    });
    expect(result).toEqual({
      data: { tokenExchanged: true, reportRead: false },
    });
  });

  it("reads the report after authenticating and counts its entries", async () => {
    mockTokenExchange();
    nock(TEST_HOST, { reqheaders: { authorization: "Bearer at-1" } })
      .get(REPORT_PATH)
      .query({ format: "json" })
      .reply(200, { Report_Entry: [{}, {}] });

    const { result } = await invoke(verifyConnection, {
      connection: refreshTokenTestConnection(),
      reportUrl: `${TEST_HOST}${REPORT_PATH}`,
    });
    expect(result).toEqual({
      data: { tokenExchanged: true, reportRead: true, reportEntryCount: 2 },
    });
  });

  it("fails with Workday's error when the credentials are rejected", async () => {
    nock(TEST_HOST)
      .post("/ccx/oauth2/acme/token")
      .reply(400, { error: "invalid_grant" });

    await expect(
      invoke(verifyConnection, {
        connection: refreshTokenTestConnection(),
        reportUrl: undefined,
      }),
    ).rejects.toThrow(
      /Workday token request failed \(HTTP 400\): invalid_grant/,
    );
  });

  it("skips the exchange for the OAuth 2.0 connection", async () => {
    const { result } = await invoke(verifyConnection, {
      connection: oauthTestConnection(),
      reportUrl: undefined,
    });
    expect(result).toEqual({
      data: { tokenExchanged: false, reportRead: false },
    });
  });
});
