import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getLocationResponse } from "../../examplePayloads/locations";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { updateLocation } from "./update";
const LOCATION_ID = "f4efe11c-221f-4b49-a1e4-33eaf96a49ee";
const ENTITY_ID = "bb25a7e8-cc2f-4ba7-9bf4-7730ffe152bb";
const PATH = apiPath(`/locations/${LOCATION_ID}`);
describe("updateLocation", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the updated location", async () => {
    rampNock()
      .patch(PATH, { name: "Brooklyn, NY", entity_id: ENTITY_ID })
      .reply(200, { ...getLocationResponse, name: "Brooklyn, NY" });
    const { result } = await invoke(updateLocation, {
      connection: testConnection,
      locationId: LOCATION_ID,
      name: "Brooklyn, NY",
      entityId: ENTITY_ID,
    });
    expect(result.data).toEqual({
      ...getLocationResponse,
      name: "Brooklyn, NY",
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .patch(PATH)
      .reply(404, { error: { message: "Location not found" } });
    await expect(
      invoke(updateLocation, {
        connection: testConnection,
        locationId: LOCATION_ID,
        name: "Brooklyn, NY",
        entityId: ENTITY_ID,
      }),
    ).rejects.toThrow();
  });
});
