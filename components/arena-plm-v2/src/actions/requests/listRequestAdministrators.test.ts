import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { listRequestAdministratorsExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { listRequestAdministrators } from "./listRequestAdministrators";
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
describe("listRequestAdministrators", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the request administrators on a 2xx", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/requests/administrators`)
      .reply(200, listRequestAdministratorsExamplePayload.data);
    const { result } = await invoke(
      listRequestAdministrators,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(listRequestAdministratorsExamplePayload.data);
  });
  it("throws when Arena rejects the request", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/requests/administrators`)
      .reply(403, { errors: [{ message: "Insufficient permissions" }] });
    await expect(
      invoke(listRequestAdministrators, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
