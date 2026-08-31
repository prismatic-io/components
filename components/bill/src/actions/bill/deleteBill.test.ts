import { invoke } from "@prismatic-io/spectral/dist/testing";
import { deleteBillExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { deleteBill } from "./deleteBill";
const ENDPOINT = "/Crud/Delete/Bill.json";
describe("deleteBill", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(deleteBillExamplePayload.data));
    const { result } = await invoke(deleteBill, {
      connection: testConnection,
      billId: "00n02XNWHOPPXWV9ewx0",
    });
    expect(result.data).toEqual(deleteBillExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(deleteBill, {
        connection: testConnection,
        billId: "00n02XNWHOPPXWV9ewx0",
      }),
    ).rejects.toThrow();
  });
});
