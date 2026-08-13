import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listVendorsResponse } from "../examplePayloads/vendors";
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
import { selectVendor } from "./vendor";
const PATH = apiPath("/accounting/vendors");
describe("selectVendor", () => {
  afterEach(resetNock);
  test("maps the vendor list into sorted dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listVendorsResponse));
    const { result } = await invokeDataSource(selectVendor, {
      connection: testConnection,
    });
    expect(result).toEqual([
      { key: "123", label: "Amazon" },
      { key: "40218", label: "Amazon" },
    ]);
  });
  test("sorts by id ascending regardless of reply order", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "c", name: "Zulu" },
          { id: "a", name: "Alpha" },
          { id: "b", name: "Bravo" },
        ]),
      );
    const { result } = await invokeDataSource(selectVendor, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectVendor, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
