import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listCustomAccountingFieldsResponse } from "../../examplePayloads/customAccountingFields";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listCustomAccountingField } from "./list";
const PATH = apiPath("/accounting/fields");
describe("listCustomAccountingField", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock()
      .get(PATH)
      .query({})
      .reply(200, listCustomAccountingFieldsResponse);
    const { result } = await invoke(
      listCustomAccountingField,
      listActionParams(),
    );
    expect(result.data).toEqual(listCustomAccountingFieldsResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listCustomAccountingFieldsResponse));
    const { result } = await invoke(
      listCustomAccountingField,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: listCustomAccountingFieldsResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(
      invoke(listCustomAccountingField, listActionParams()),
    ).rejects.toThrow();
  });
});
