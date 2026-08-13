import { invoke } from "@prismatic-io/spectral/dist/testing";
import { GENERIC_DELETE_RESPONSE } from "../../../constants";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../../testHarness";
import { deleteCustomAccountingFieldOption } from "./delete";
const OPTION_ID = "50097";
const PATH = apiPath(`/accounting/field-options/${OPTION_ID}`);
describe("deleteCustomAccountingFieldOption", () => {
  afterEach(resetNock);
  test("returns the generic delete constant rather than the API response body", async () => {
    rampNock().delete(PATH).reply(200, { id: OPTION_ID, deleted: true });
    const { result } = await invoke(deleteCustomAccountingFieldOption, {
      connection: testConnection,
      customAccountingFieldOptionId: OPTION_ID,
    });
    expect(result.data).toBe(GENERIC_DELETE_RESPONSE);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .delete(PATH)
      .reply(404, { error: { message: "Field option not found" } });
    await expect(
      invoke(deleteCustomAccountingFieldOption, {
        connection: testConnection,
        customAccountingFieldOptionId: OPTION_ID,
      }),
    ).rejects.toThrow();
  });
});
