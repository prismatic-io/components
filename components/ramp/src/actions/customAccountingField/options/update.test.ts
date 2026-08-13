import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomAccountingFieldOptionResponse } from "../../../examplePayloads/customAccountingFieldOption";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../../testHarness";
import { updateCustomAccountingFieldOption } from "./update";
const OPTION_ID = "50097";
const PATH = apiPath(`/accounting/field-options/${OPTION_ID}`);
describe("updateCustomAccountingFieldOption", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the updated option", async () => {
    rampNock()
      .patch(PATH, { reactivate: true, value: "Office/Admin:Utilities" })
      .reply(200, {
        ...getCustomAccountingFieldOptionResponse,
        value: "Office/Admin:Utilities",
      });
    const { result } = await invoke(updateCustomAccountingFieldOption, {
      connection: testConnection,
      customAccountingFieldOptionId: OPTION_ID,
      reactivate: true,
      value: "Office/Admin:Utilities",
    });
    expect(result.data).toEqual({
      ...getCustomAccountingFieldOptionResponse,
      value: "Office/Admin:Utilities",
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .patch(PATH)
      .reply(404, { error: { message: "Field option not found" } });
    await expect(
      invoke(updateCustomAccountingFieldOption, {
        connection: testConnection,
        customAccountingFieldOptionId: OPTION_ID,
        reactivate: true,
        value: "Office/Admin:Utilities",
      }),
    ).rejects.toThrow();
  });
});
