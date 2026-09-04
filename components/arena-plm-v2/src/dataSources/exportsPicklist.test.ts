import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listExportsExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { exportsPicklist } from "./exportsPicklist";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  number: undefined,
  name: undefined,
  description: undefined,
  creatorGuid: undefined,
  creatorEmail: undefined,
  creatorFullName: undefined,
  limit: undefined,
  offset: undefined,
});
describe("exportsPicklist", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("labels each export with its name and number, keyed by GUID", async () => {
    nock(ARENA_HOST)
      .get(`${API}/exports`)
      .reply(200, listExportsExamplePayload.data);
    const { result } = await invokeDataSource(
      exportsPicklist,
      params(),
      createTestContext(),
    );
    const expected = listExportsExamplePayload.data.results;
    expect(result).toHaveLength(expected.length);
    expect(result[0]).toEqual({
      label: `${expected[0].name} #${expected[0].number}`,
      key: expected[0].guid,
    });
  });
  it("returns an empty option list when the workspace has no exports", async () => {
    nock(ARENA_HOST)
      .get(`${API}/exports`)
      .reply(200, { results: [], count: 0 });
    const { result } = await invokeDataSource(
      exportsPicklist,
      params(),
      createTestContext(),
    );
    expect(result).toEqual([]);
  });
  it("propagates an HTTP failure instead of returning an empty option list", async () => {
    nock(ARENA_HOST)
      .get(`${API}/exports`)
      .reply(503, { errors: [{ message: "Service temporarily unavailable" }] });
    await expect(
      invokeDataSource(exportsPicklist, params(), createTestContext()),
    ).rejects.toThrow("Failed to get exports datasource (Status 503)");
  });
});
