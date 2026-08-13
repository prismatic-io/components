import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomAccountingFieldOptionResponse } from "../../../examplePayloads/customAccountingFieldOption";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../../testHarness";
import { uploadCustomAccountingFieldOption } from "./upload";
const PATH = apiPath("/accounting/field-options");
const OPTIONS = [{ id: "50097", value: "Office/Admin:Phone & Internet" }];
describe("uploadCustomAccountingFieldOption", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the created option", async () => {
    rampNock()
      .post(PATH, { field_id: "Department", options: OPTIONS })
      .reply(200, getCustomAccountingFieldOptionResponse);
    const { result } = await invoke(uploadCustomAccountingFieldOption, {
      connection: testConnection,
      customAccountingFieldOptionId: "Department",
      options: OPTIONS,
    });
    expect(result.data).toEqual(getCustomAccountingFieldOptionResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .post(PATH)
      .reply(422, { error: { message: "Invalid options payload" } });
    await expect(
      invoke(uploadCustomAccountingFieldOption, {
        connection: testConnection,
        customAccountingFieldOptionId: "Department",
        options: OPTIONS,
      }),
    ).rejects.toThrow();
  });
});
