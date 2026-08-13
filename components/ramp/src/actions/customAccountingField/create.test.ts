import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { createCustomAccountingField } from "./create";
const PATH = apiPath("/accounting/fields");
describe("createCustomAccountingField", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the created field", async () => {
    rampNock()
      .post(PATH, {
        id: "Department",
        name: "Department",
        input_type: "SINGLE_CHOICE",
        is_splittable: true,
      })
      .reply(200, getCustomAccountingFieldResponse);
    const { result } = await invoke(createCustomAccountingField, {
      connection: testConnection,
      customAccountingFieldId: "Department",
      name: "Department",
      inputType: "SINGLE_CHOICE",
      isSplittable: true,
    });
    expect(result.data).toEqual(getCustomAccountingFieldResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .post(PATH)
      .reply(422, { error: { message: "Invalid input_type" } });
    await expect(
      invoke(createCustomAccountingField, {
        connection: testConnection,
        customAccountingFieldId: "Department",
        name: "Department",
        inputType: "NOT_A_TYPE",
        isSplittable: true,
      }),
    ).rejects.toThrow();
  });
});
