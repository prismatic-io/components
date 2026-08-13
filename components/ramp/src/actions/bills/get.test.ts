import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getBillResponse } from "../../examplePayloads/bills";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getBill } from "./get";
const BILL_ID = "6e3816e3-0e53-42ae-b075-bdb0adff10c4";
const PATH = apiPath(`bills/${BILL_ID}`);
describe("getBill", () => {
  afterEach(resetNock);
  test("returns the bill the API replies with", async () => {
    rampNock().get(PATH).reply(200, getBillResponse);
    const { result } = await invoke(getBill, {
      connection: testConnection,
      billId: BILL_ID,
    });
    expect(result.data).toEqual(getBillResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Bill not found" } });
    await expect(
      invoke(getBill, {
        connection: testConnection,
        billId: BILL_ID,
      }),
    ).rejects.toThrow();
  });
});
