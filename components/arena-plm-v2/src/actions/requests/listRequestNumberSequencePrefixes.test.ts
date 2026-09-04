import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { listRequestNumberSequencePrefixesExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { listRequestNumberSequencePrefixes } from "./listRequestNumberSequencePrefixes";
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
});
describe("listRequestNumberSequencePrefixes", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the number sequence prefixes on a 2xx", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/requests/numbersequenceprefixes`)
      .reply(200, listRequestNumberSequencePrefixesExamplePayload.data);
    const { result } = await invoke(
      listRequestNumberSequencePrefixes,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(
      listRequestNumberSequencePrefixesExamplePayload.data,
    );
  });
  it("throws when Arena rejects the request", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/requests/numbersequenceprefixes`)
      .reply(500, { errors: [{ message: "Internal error" }] });
    await expect(
      invoke(listRequestNumberSequencePrefixes, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
