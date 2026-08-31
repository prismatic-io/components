import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createBillExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { createBill } from "./createBill";
const params = {
  connection: testConnection,
  vendorId: "00902YSHZXAKZHY25m0r",
  invoiceNumber: "01",
  invoiceDate: "2024-07-01",
  dueDate: "2024-08-01",
  billLineItems: [],
  allowDuplicateInvNum: undefined,
  additionalFields: undefined,
};
describe("createBill", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post("/Crud/Create/Bill.json")
      .reply(200, envelope(createBillExamplePayload.data));
    const { result } = await invoke(createBill, params);
    expect(result.data).toEqual(createBillExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post("/Crud/Create/Bill.json").reply(422, {});
    await expect(invoke(createBill, params)).rejects.toThrow();
  });
});
