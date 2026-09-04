import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listNumberSequencePrefixesExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { numberSequencePrefixesPicklist } from "./numberSequencePrefixesPicklist";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const OBJECT_TYPE = "changes";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  objectType: OBJECT_TYPE,
});
describe("numberSequencePrefixesPicklist", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("uses the prefix value for both the label and the key", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/${OBJECT_TYPE}/numbersequenceprefixes`)
      .reply(200, listNumberSequencePrefixesExamplePayload.data);
    const { result } = await invokeDataSource(
      numberSequencePrefixesPicklist,
      params(),
      createTestContext(),
    );
    const expected =
      listNumberSequencePrefixesExamplePayload.data.results ?? [];
    expect(result).toHaveLength(expected.length);
    expect(result[0]).toEqual({
      label: expected[0].value,
      key: expected[0].value,
    });
  });
  it("returns an empty option list when the object type has no prefixes", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/${OBJECT_TYPE}/numbersequenceprefixes`)
      .reply(200, { results: [], count: 0 });
    const { result } = await invokeDataSource(
      numberSequencePrefixesPicklist,
      params(),
      createTestContext(),
    );
    expect(result).toEqual([]);
  });
  it("propagates an HTTP failure instead of returning an empty option list", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/${OBJECT_TYPE}/numbersequenceprefixes`)
      .reply(429, { errors: [{ message: "Too many requests" }] });
    await expect(
      invokeDataSource(
        numberSequencePrefixesPicklist,
        params(),
        createTestContext(),
      ),
    ).rejects.toThrow(
      `Failed to get ${OBJECT_TYPE} number sequence prefixes datasource (Status 429)`,
    );
  });
});
