import { invoke } from "@prismatic-io/spectral/dist/testing";
import { updateBillExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { updateBill } from "./updateBill";
const ENDPOINT = "/Crud/Update/Bill.json";
const params = {
  connection: testConnection,
  billId: "00n02XNWHOPPXWV9ewx0",
  vendorId: "00902YSHZXAKZHY25m0r",
  invoiceNumber: "01",
  invoiceDate: "2024-07-01",
  dueDate: "2024-08-01",
  billLineItems: [],
  allowDuplicateInvNum: undefined,
  additionalFields: undefined,
};
describe("updateBill", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(updateBillExamplePayload.data));
    const { result } = await invoke(updateBill, params);
    expect(result.data).toEqual(updateBillExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(updateBill, params)).rejects.toThrow();
  });
});
