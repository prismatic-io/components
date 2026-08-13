import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { lisCustomAccountingFieldOptionsResponse } from "../examplePayloads/customAccountingFieldOption";
import {
  apiPath,
  elementKeys,
  emptyListBody,
  listBody,
  rampNock,
  resetNock,
  terminatePaging,
  testConnection,
} from "../testHarness";
import { selectCustomAccountingFieldOption } from "./customAccountingFieldOption";
const PATH = apiPath("/accounting/field-options");
const FIELD_ID = "96bb7007-eec5-430f-8d09-e033cbc000c2";
describe("selectCustomAccountingFieldOption", () => {
  afterEach(resetNock);
  test("maps the field option list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(lisCustomAccountingFieldOptionsResponse));
    const { result } = await invokeDataSource(
      selectCustomAccountingFieldOption,
      {
        connection: testConnection,
        customAccountingFieldId: FIELD_ID,
      },
    );
    expect(result).toEqual([
      { key: "123", label: "Office/Admin:Phone & Internet" },
    ]);
  });
  test("forwards the sibling field id as the field_id query parameter", async () => {
    const scope = rampNock()
      .get(PATH)
      .query((actual) => actual.field_id === FIELD_ID)
      .reply(200, emptyListBody());
    await invokeDataSource(selectCustomAccountingFieldOption, {
      connection: testConnection,
      customAccountingFieldId: FIELD_ID,
    });
    expect(scope.isDone()).toBe(true);
  });
  test("sorts by value ascending, not by id", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "1", value: "Zulu" },
          { id: "2", value: "Alpha" },
          { id: "3", value: "Bravo" },
        ]),
      );
    const { result } = await invokeDataSource(
      selectCustomAccountingFieldOption,
      {
        connection: testConnection,
        customAccountingFieldId: FIELD_ID,
      },
    );
    expect(elementKeys(result)).toEqual(["2", "3", "1"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(
      selectCustomAccountingFieldOption,
      {
        connection: testConnection,
        customAccountingFieldId: FIELD_ID,
      },
    );
    expect(result).toEqual([]);
  });
});
