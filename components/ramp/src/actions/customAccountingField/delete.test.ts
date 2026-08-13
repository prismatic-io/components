import { invoke } from "@prismatic-io/spectral/dist/testing";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { deleteCustomAccountingField } from "./delete";
const FIELD_ID = "Department";
const PATH = apiPath(`/accounting/fields/${FIELD_ID}`);
describe("deleteCustomAccountingField", () => {
  afterEach(resetNock);
  test("returns the generic delete constant rather than the API response body", async () => {
    rampNock().delete(PATH).reply(200, { id: FIELD_ID, deleted: true });
    const { result } = await invoke(deleteCustomAccountingField, {
      connection: testConnection,
      customAccountingFieldId: FIELD_ID,
    });
    expect(result.data).toBe(GENERIC_DELETE_RESPONSE);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .delete(PATH)
      .reply(404, { error: { message: "Field not found" } });
    await expect(
      invoke(deleteCustomAccountingField, {
        connection: testConnection,
        customAccountingFieldId: FIELD_ID,
      }),
    ).rejects.toThrow();
  });
});
