import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { listQualityProcessOwnersExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { listQualityProcessOwners } from "./listQualityProcessOwners";
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
describe("listQualityProcessOwners", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the assignable owners on a 2xx", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/qualityprocesses/owners`)
      .reply(200, listQualityProcessOwnersExamplePayload.data);
    const { result } = await invoke(
      listQualityProcessOwners,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(listQualityProcessOwnersExamplePayload.data);
  });
  it("throws when Arena rejects the request", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/qualityprocesses/owners`)
      .reply(403, { errors: [{ message: "Insufficient permissions" }] });
    await expect(
      invoke(listQualityProcessOwners, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
