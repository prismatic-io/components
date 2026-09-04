import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { updateExtractExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { updateExtract } from "./updateExtract";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const EXTRACT_GUID = "EXT123DEF456GHI789JKL012";
const params = () => ({
  connection: connection(),
  extractGuid: EXTRACT_GUID,
  extractData: { name: "Weekly Item Extract (revised)" },
});
describe("updateExtract", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the updated extract definition on a 2xx", async () => {
    nock(ARENA_HOST)
      .put(`${API}/extracts/${EXTRACT_GUID}`)
      .reply(200, updateExtractExamplePayload.data);
    const { result } = await invoke(
      updateExtract,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(updateExtractExamplePayload.data);
  });
  it("throws when the extract does not exist", async () => {
    nock(ARENA_HOST)
      .put(`${API}/extracts/${EXTRACT_GUID}`)
      .reply(404, { errors: [{ message: "Extract not found" }] });
    await expect(
      invoke(updateExtract, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
