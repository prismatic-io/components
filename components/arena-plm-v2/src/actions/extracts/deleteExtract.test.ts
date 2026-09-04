import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createTestContext } from "../../tests/testContext";
import { deleteExtract } from "./deleteExtract";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const EXTRACT_GUID = "EXT123DEF456GHI789JKL012";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  extractGuid: EXTRACT_GUID,
});
describe("deleteExtract", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("throws rather than reporting success when Arena rejects the delete", async () => {
    nock(ARENA_HOST)
      .delete(`${API}/extracts/${EXTRACT_GUID}`)
      .reply(404, { errors: [{ message: "Extract not found" }] });
    await expect(
      invoke(deleteExtract, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
