import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { listFileCategoriesExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { listFileCategories } from "./listFileCategories";
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
  path: undefined,
  includeDeleted: undefined,
  assignable: undefined,
  user: undefined,
  action: undefined,
});
describe("listFileCategories", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the category list on a 2xx", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/files/categories`)
      .reply(200, listFileCategoriesExamplePayload.data);
    const { result } = await invoke(
      listFileCategories,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(listFileCategoriesExamplePayload.data);
  });
  it("throws when Arena rejects the request", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/files/categories`)
      .reply(500, { errors: [{ message: "Internal error" }] });
    await expect(
      invoke(listFileCategories, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
