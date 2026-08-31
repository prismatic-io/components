import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listVendorsExamplePayload } from "../examplePayloads";
import { RESOURCE_CONFIG } from "../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../testHelpers";
import { selectVendor } from "./selectVendor";
const ENDPOINT = RESOURCE_CONFIG.vendors.endpoint;
describe("selectVendor", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("maps the list into { key, label } elements (id -> key, name -> label)", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listVendorsExamplePayload.data));
    const { result } = await invokeDataSource(selectVendor, {
      connection: testConnection,
    });
    expect(scope.isDone()).toBe(true);
    const records = listVendorsExamplePayload.data as {
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
    const { result } = await invokeDataSource(selectVendor, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
