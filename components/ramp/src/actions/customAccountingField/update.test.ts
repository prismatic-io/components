import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { updateCustomAccountingField } from "./update";
const FIELD_ID = "Department";
const PATH = apiPath(`/accounting/fields/${FIELD_ID}`);
describe("updateCustomAccountingField", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the updated field", async () => {
    rampNock()
      .patch(PATH, { name: "Cost Center", is_splittable: false })
      .reply(200, { ...getCustomAccountingFieldResponse, name: "Cost Center" });
    const { result } = await invoke(updateCustomAccountingField, {
      connection: testConnection,
      customAccountingFieldId: FIELD_ID,
      name: "Cost Center",
      isSplittable: false,
    });
    expect(result.data).toEqual({
      ...getCustomAccountingFieldResponse,
      name: "Cost Center",
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .patch(PATH)
      .reply(404, { error: { message: "Field not found" } });
    await expect(
      invoke(updateCustomAccountingField, {
        connection: testConnection,
        customAccountingFieldId: FIELD_ID,
        name: "Cost Center",
        isSplittable: false,
      }),
    ).rejects.toThrow();
  });
});
