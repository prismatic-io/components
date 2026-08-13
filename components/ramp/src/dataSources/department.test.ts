import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listDepartmentsResponse } from "../examplePayloads/departments";
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
import { selectDepartment } from "./department";
const PATH = apiPath("departments");
describe("selectDepartment", () => {
  afterEach(resetNock);
  test("maps the department list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listDepartmentsResponse));
    const { result } = await invokeDataSource(selectDepartment, {
      connection: testConnection,
    });
    expect(result).toEqual([
      { key: "c16b6ee1-2f5d-45e9-9fb4-c1c541a9ea70", label: "Bookkeeping" },
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
    const { result } = await invokeDataSource(selectDepartment, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectDepartment, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
