import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getCustomAccountingField } from "./get";
const FIELD_ID = "Department";
const PATH = apiPath(`/accounting/fields/${FIELD_ID}`);
describe("getCustomAccountingField", () => {
  afterEach(resetNock);
  test("returns the custom accounting field the API replies with", async () => {
    rampNock().get(PATH).reply(200, getCustomAccountingFieldResponse);
    const { result } = await invoke(getCustomAccountingField, {
      connection: testConnection,
      customAccountingFieldId: FIELD_ID,
    });
    expect(result.data).toEqual(getCustomAccountingFieldResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Field not found" } });
    await expect(
      invoke(getCustomAccountingField, {
        connection: testConnection,
        customAccountingFieldId: FIELD_ID,
      }),
    ).rejects.toThrow();
  });
});
