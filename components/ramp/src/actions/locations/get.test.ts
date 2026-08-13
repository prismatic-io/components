import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getLocationResponse } from "../../examplePayloads/locations";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getLocation } from "./get";
const LOCATION_ID = "f4efe11c-221f-4b49-a1e4-33eaf96a49ee";
const PATH = apiPath(`/locations/${LOCATION_ID}`);
describe("getLocation", () => {
  afterEach(resetNock);
  test("returns the location the API replies with", async () => {
    rampNock().get(PATH).reply(200, getLocationResponse);
    const { result } = await invoke(getLocation, {
      connection: testConnection,
      locationId: LOCATION_ID,
    });
    expect(result.data).toEqual(getLocationResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Location not found" } });
    await expect(
      invoke(getLocation, {
        connection: testConnection,
        locationId: LOCATION_ID,
      }),
    ).rejects.toThrow();
  });
});
