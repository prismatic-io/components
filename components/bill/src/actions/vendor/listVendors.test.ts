import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listVendorsExamplePayload } from "../../examplePayloads";
import { RESOURCE_CONFIG } from "../../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { listVendors } from "./listVendors";
const ENDPOINT = RESOURCE_CONFIG.vendors.endpoint;
describe("listVendors", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listVendorsExamplePayload.data));
    const { result } = await invoke(listVendors, {
      connection: testConnection,
      filters: undefined,
      sort: undefined,
      start: 0,
      max: 999,
      nested: false,
    });
    expect(result.data).toEqual(listVendorsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(listVendors, {
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
