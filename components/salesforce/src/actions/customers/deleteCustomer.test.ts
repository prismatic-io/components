import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { salesforceOAuth } from "../../connections";
import { DEFAULT_SF_VERSION } from "../../constants";
import { deleteCustomer } from "./deleteCustomer";

const INSTANCE_URL = "https://example-dev-ed.my.salesforce.com";
const ACCESS_TOKEN = "00Dxx0000000000!fake-access-token";
const BASE_PATH = `/services/data/v${DEFAULT_SF_VERSION}`;
const RECORD_ID = "0o68c000000wk3lAAA";

const connection = createConnection(
  salesforceOAuth,
  {},
  { instance_url: INSTANCE_URL, access_token: ACCESS_TOKEN },
);

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe("deleteCustomer", () => {
  test("issues a DELETE for the Customer record and returns the delete result", async () => {
    const scope = nock(INSTANCE_URL)
      .delete(`${BASE_PATH}/sobjects/Customer/${RECORD_ID}`)
      .reply(204);

    const { result } = await invoke(deleteCustomer, {
      connection,
      version: DEFAULT_SF_VERSION,
      recordId: RECORD_ID,
    } as never);

    expect(scope.isDone()).toBe(true);
    expect(result).toStrictEqual({
      data: { id: RECORD_ID, success: true, errors: [] },
    });
  });

  test("does not retrieve the Customer record", async () => {
    nock(INSTANCE_URL)
      .delete(`${BASE_PATH}/sobjects/Customer/${RECORD_ID}`)
      .reply(204);
    const retrieve = nock(INSTANCE_URL)
      .get(`${BASE_PATH}/sobjects/Customer/${RECORD_ID}`)
      .reply(200, { Id: RECORD_ID });

    await invoke(deleteCustomer, {
      connection,
      version: DEFAULT_SF_VERSION,
      recordId: RECORD_ID,
    } as never);

    expect(retrieve.isDone()).toBe(false);
  });
});
