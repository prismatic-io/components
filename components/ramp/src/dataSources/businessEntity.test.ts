import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listBusinessEntitiesResponse } from "../examplePayloads/businessEntities";
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
import { selectBusinessEntity } from "./businessEntity";
const PATH = apiPath("entities");
describe("selectBusinessEntity", () => {
  afterEach(resetNock);
  test("maps the entity list into sorted dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listBusinessEntitiesResponse));
    const { result } = await invokeDataSource(selectBusinessEntity, {
      connection: testConnection,
    });
    expect(result).toEqual([
      { key: "364bab39-0485-4bcf-b9b1-7f18fac77600", label: "Global Entity" },
      { key: "55da4b86-5b47-4b6b-a274-a669a6cb14be", label: "Canada" },
    ]);
  });
  test("sorts by id ascending regardless of reply order", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "c", entity_name: "Zulu" },
          { id: "a", entity_name: "Alpha" },
          { id: "b", entity_name: "Bravo" },
        ]),
      );
    const { result } = await invokeDataSource(selectBusinessEntity, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectBusinessEntity, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
