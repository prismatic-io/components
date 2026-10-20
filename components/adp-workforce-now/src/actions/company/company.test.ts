import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../../constants";
import { listCompanyCodesExamplePayload } from "../../examplePayloads";
import { listCompanyCodes } from "./listCompanyCodes";
const BASE = "https://api.adp.com";
const TOKEN = "test-token";
const PATH =
  "/codelists/payroll/v4/payroll-instruction-management/pay-groups/wfn/1";
const connection = createConnection(adpOauth2, {
  endpoint: API_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  clientId: "client-id",
  clientSecret: "client-secret",
  sslCert: "-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----",
  sslKey: "-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----",
});
const context = () => ({
  executionState: {
    [`ADP - ${connection.configVarKey}`]: {
      accessToken: TOKEN,
      expiresDate: Date.now() / 1000 + 3600,
    },
  },
});
const api = () =>
  nock(BASE, { reqheaders: { authorization: `Bearer ${TOKEN}` } });
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("listCompanyCodes", () => {
  test("happy path returns the company codes", async () => {
    api()
      .get(PATH)
      .query({ $filter: "category eq 'US'" })
      .reply(200, listCompanyCodesExamplePayload.data);
    const { result } = await invoke(
      listCompanyCodes,
      { connection, $filter: "category eq 'US'" },
      context(),
    );
    expect(result).toEqual(listCompanyCodesExamplePayload);
  });
  test("error path rejects", async () => {
    api().get(PATH).query(true).reply(500, { error: "boom" });
    await expect(
      invoke(listCompanyCodes, { connection, $filter: "" }, context()),
    ).rejects.toThrow();
  });
});
