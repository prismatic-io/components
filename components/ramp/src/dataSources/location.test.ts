import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listLocationsResponse } from "../examplePayloads/locations";
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
import { selectLocation } from "./location";
const PATH = apiPath("locations");
describe("selectLocation", () => {
  afterEach(resetNock);
  test("maps the location list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listLocationsResponse));
    const { result } = await invokeDataSource(selectLocation, {
      connection: testConnection,
    });
    expect(result).toEqual([
      {
        key: "f4efe11c-221f-4b49-a1e4-33eaf96a49ee",
        label: "New York City, NY",
      },
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
    const { result } = await invokeDataSource(selectLocation, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectLocation, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
