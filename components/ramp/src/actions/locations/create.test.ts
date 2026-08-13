import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getLocationResponse } from "../../examplePayloads/locations";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { createLocation } from "./create";
const PATH = apiPath("/locations");
const ENTITY_ID = "bb25a7e8-cc2f-4ba7-9bf4-7730ffe152bb";
describe("createLocation", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the created location", async () => {
    rampNock()
      .post(PATH, { entity_id: ENTITY_ID, name: "Austin, TX" })
      .reply(200, { ...getLocationResponse, name: "Austin, TX" });
    const { result } = await invoke(createLocation, {
      connection: testConnection,
      name: "Austin, TX",
      entityId: ENTITY_ID,
    });
    expect(result.data).toEqual({ ...getLocationResponse, name: "Austin, TX" });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .post(PATH)
      .reply(422, { error: { message: "name is required" } });
    await expect(
      invoke(createLocation, {
        connection: testConnection,
        name: "Austin, TX",
        entityId: ENTITY_ID,
      }),
    ).rejects.toThrow();
  });
});
