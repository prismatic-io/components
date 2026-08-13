import { invoke } from "@prismatic-io/spectral/dist/testing";
import { lisCustomAccountingFieldOptionsResponse } from "../../../examplePayloads/customAccountingFieldOption";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../../testHarness";
import { listCustomAccountingFieldOptions } from "./list";
const FIELD_ID = "Department";
const PATH = apiPath("/accounting/field-options");
describe("listCustomAccountingFieldOptions", () => {
  afterEach(resetNock);
  test("scopes the request to the field via field_id when Fetch All is off", async () => {
    rampNock()
      .get(PATH)
      .query({ field_id: FIELD_ID })
      .reply(200, lisCustomAccountingFieldOptionsResponse);
    const { result } = await invoke(listCustomAccountingFieldOptions, {
      ...listActionParams(),
      customAccountingFieldId: FIELD_ID,
    });
    expect(result.data).toEqual(lisCustomAccountingFieldOptionsResponse);
  });
  test("injects page_size 50 alongside field_id when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50", field_id: FIELD_ID })
      .reply(200, terminatePaging(lisCustomAccountingFieldOptionsResponse));
    const { result } = await invoke(listCustomAccountingFieldOptions, {
      ...listActionParams({ fetchAll: true }),
      customAccountingFieldId: FIELD_ID,
    });
    expect(result.data).toEqual({
      data: lisCustomAccountingFieldOptionsResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(
      invoke(listCustomAccountingFieldOptions, {
        ...listActionParams(),
        customAccountingFieldId: FIELD_ID,
      }),
    ).rejects.toThrow();
  });
});
