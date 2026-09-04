import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listOutboundEventIntegrationsExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { outboundEventIntegrationsPicklist } from "./outboundEventIntegrationsPicklist";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  name: undefined,
  enabled: "all",
});
describe("outboundEventIntegrationsPicklist", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("maps every integration to a label and key pair, asking Arena for 400", async () => {
    nock(ARENA_HOST)
      .get(`${API}/outboundevents`)
      .query({ limit: "400" })
      .reply(200, listOutboundEventIntegrationsExamplePayload.data);
    const { result } = await invokeDataSource(
      outboundEventIntegrationsPicklist,
      params(),
      createTestContext(),
    );
    const expected = listOutboundEventIntegrationsExamplePayload.data.results;
    expect(result).toHaveLength(expected.length);
    expect(result[0]).toEqual({
      label: expected[0].name,
      key: expected[0].guid,
    });
  });
  it("returns an empty option list when the workspace has no integrations", async () => {
    nock(ARENA_HOST)
      .get(`${API}/outboundevents`)
      .query({ limit: "400" })
      .reply(200, { results: [], count: 0 });
    const { result } = await invokeDataSource(
      outboundEventIntegrationsPicklist,
      params(),
      createTestContext(),
    );
    expect(result).toEqual([]);
  });
  it("propagates an HTTP failure instead of returning an empty option list", async () => {
    nock(ARENA_HOST)
      .get(`${API}/outboundevents`)
      .query({ limit: "400" })
      .reply(403, { errors: [{ message: "Insufficient permissions" }] });
    await expect(
      invokeDataSource(
        outboundEventIntegrationsPicklist,
        params(),
        createTestContext(),
      ),
    ).rejects.toThrow(
      "Failed to get outbound event integrations datasource (Status 403)",
    );
  });
});
