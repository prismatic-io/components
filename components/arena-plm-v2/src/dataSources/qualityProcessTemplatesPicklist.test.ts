import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listQualityProcessTemplatesExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { qualityProcessTemplatesPicklist } from "./qualityProcessTemplatesPicklist";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
});
describe("qualityProcessTemplatesPicklist", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("maps every template to a label and key pair", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/qualityprocesses/templates`)
      .reply(200, listQualityProcessTemplatesExamplePayload.data);
    const { result } = await invokeDataSource(
      qualityProcessTemplatesPicklist,
      params(),
      createTestContext(),
    );
    const expected = listQualityProcessTemplatesExamplePayload.data.results;
    expect(result).toHaveLength(expected.length);
    expect(result[0]).toEqual({
      label: expected[0].name,
      key: expected[0].guid,
    });
  });
  it("returns an empty option list when the workspace has no templates", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/qualityprocesses/templates`)
      .reply(200, { results: [], count: 0 });
    const { result } = await invokeDataSource(
      qualityProcessTemplatesPicklist,
      params(),
      createTestContext(),
    );
    expect(result).toEqual([]);
  });
  it("propagates an HTTP failure instead of returning an empty option list", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/qualityprocesses/templates`)
      .reply(500, { errors: [{ message: "Internal error" }] });
    await expect(
      invokeDataSource(
        qualityProcessTemplatesPicklist,
        params(),
        createTestContext(),
      ),
    ).rejects.toThrow(
      "Failed to get quality process templates datasource (Status 500)",
    );
  });
});
