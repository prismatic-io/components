import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createItemNumberFormatFieldExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createItemNumberFormatField } from "./createItemNumberFormatField";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const FORMAT_GUID = "4NF55NF66NF77NF88NF99NF0";
const params = () => ({
  connection: connection(),
  formatGuid: FORMAT_GUID,
  fieldData: { name: "Family Code", length: 3 },
});
describe("createItemNumberFormatField", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the created number format field on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/settings/items/numberformats/${FORMAT_GUID}/fields`)
      .reply(200, createItemNumberFormatFieldExamplePayload.data);
    const { result } = await invoke(
      createItemNumberFormatField,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createItemNumberFormatFieldExamplePayload.data);
  });
  it("throws when Arena rejects the field", async () => {
    nock(ARENA_HOST)
      .post(`${API}/settings/items/numberformats/${FORMAT_GUID}/fields`)
      .reply(400, {
        errors: [{ message: "length must be greater than zero" }],
      });
    await expect(
      invoke(createItemNumberFormatField, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
