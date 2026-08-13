import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getBusinessEntitiesResponse } from "../../examplePayloads/businessEntities";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getBusinessEntity } from "./get";
const ENTITY_ID = "55da4b86-5b47-4b6b-a274-a669a6cb14be";
const PATH = apiPath(`entities/${ENTITY_ID}`);
describe("getBusinessEntity", () => {
  afterEach(resetNock);
  test("returns the business entity the API replies with", async () => {
    rampNock().get(PATH).reply(200, getBusinessEntitiesResponse);
    const { result } = await invoke(getBusinessEntity, {
      connection: testConnection,
      businessEntityId: ENTITY_ID,
    });
    expect(result.data).toEqual(getBusinessEntitiesResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Entity not found" } });
    await expect(
      invoke(getBusinessEntity, {
        connection: testConnection,
        businessEntityId: ENTITY_ID,
      }),
    ).rejects.toThrow();
  });
});
