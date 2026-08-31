import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listCustomerExamplePayload } from "../examplePayloads";
import { RESOURCE_CONFIG } from "../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../testHelpers";
import { selectCustomer } from "./selectCustomer";
const ENDPOINT = RESOURCE_CONFIG.customers.endpoint;
describe("selectCustomer", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("maps the list into { key, label } elements (id -> key, name -> label)", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listCustomerExamplePayload.data));
    const { result } = await invokeDataSource(selectCustomer, {
      connection: testConnection,
    });
    expect(scope.isDone()).toBe(true);
    const records = listCustomerExamplePayload.data as {
      id: string;
      name: string;
    }[];
    expect(result).toEqual(records.map((r) => ({ key: r.id, label: r.name })));
    for (const element of result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("returns an empty array when the list is empty", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(200, envelope([]));
    const { result } = await invokeDataSource(selectCustomer, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
