import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createExtractExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createExtract } from "./createExtract";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const params = () => ({
  connection: connection(),
  extractData: { name: "Weekly Item Extract", format: "CSV" },
});
describe("createExtract", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the created extract definition on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/extracts`)
      .reply(200, createExtractExamplePayload.data);
    const { result } = await invoke(
      createExtract,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createExtractExamplePayload.data);
  });
  it("throws when Arena rejects the extract definition", async () => {
    nock(ARENA_HOST)
      .post(`${API}/extracts`)
      .reply(400, { errors: [{ message: "name is required" }] });
    await expect(
      invoke(createExtract, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
