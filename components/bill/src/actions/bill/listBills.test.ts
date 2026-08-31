import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listBillsExamplePayload } from "../../examplePayloads";
import { RESOURCE_CONFIG } from "../../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { listBills } from "./listBills";
const ENDPOINT = RESOURCE_CONFIG.bills.endpoint;
describe("listBills", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listBillsExamplePayload.data));
    const { result } = await invoke(listBills, {
      connection: testConnection,
      filters: undefined,
      sort: undefined,
      start: 0,
      max: 999,
      nested: false,
    });
    expect(result.data).toEqual(listBillsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(listBills, {
        connection: testConnection,
        filters: undefined,
        sort: undefined,
        start: 0,
        max: 999,
        nested: false,
      }),
    ).rejects.toThrow();
  });
});
