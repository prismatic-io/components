import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getBillExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { getBill } from "./getBill";
describe("getBill", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data from the Bill.com envelope", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post("/Crud/Read/Bill.json")
      .reply(200, envelope(getBillExamplePayload.data));
    const { result } = await invoke(getBill, {
      connection: testConnection,
      billId: "00n02XNWHOPPXWV9ewx0",
    });
    expect(result.data).toEqual(getBillExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE)
      .post("/Crud/Read/Bill.json")
      .reply(400, { response_status: 1, response_message: "Bad request" });
    await expect(
      invoke(getBill, {
        connection: testConnection,
        billId: "bad-id",
      }),
    ).rejects.toThrow();
  });
});
