import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { listFileAttributesExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { listFileAttributes } from "./listFileAttributes";
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
  includePossibleValues: undefined,
  creatableOnly: undefined,
  editableOnly: undefined,
  searchableOnly: undefined,
  includeDeleted: undefined,
});
describe("listFileAttributes", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the attribute list on a 2xx", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/files/attributes`)
      .reply(200, listFileAttributesExamplePayload.data);
    const { result } = await invoke(
      listFileAttributes,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(listFileAttributesExamplePayload.data);
  });
  it("throws when Arena rejects the request", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/files/attributes`)
      .reply(403, { errors: [{ message: "Insufficient permissions" }] });
    await expect(
      invoke(listFileAttributes, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
