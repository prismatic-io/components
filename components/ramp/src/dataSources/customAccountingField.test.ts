import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listCustomAccountingFieldsResponse } from "../examplePayloads/customAccountingFields";
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
import { selectCustomAccountingField } from "./customAccountingField";
const PATH = apiPath("/accounting/fields");
describe("selectCustomAccountingField", () => {
  afterEach(resetNock);
  test("maps the custom accounting field list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listCustomAccountingFieldsResponse));
    const { result } = await invokeDataSource(selectCustomAccountingField, {
      connection: testConnection,
    });
    expect(result).toEqual([{ key: "Department", label: "Department" }]);
  });
  test("sorts by name ascending, not by id", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "1", name: "Zulu" },
          { id: "2", name: "Alpha" },
          { id: "3", name: "Bravo" },
        ]),
      );
    const { result } = await invokeDataSource(selectCustomAccountingField, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["2", "3", "1"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectCustomAccountingField, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
