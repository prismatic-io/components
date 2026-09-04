import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { getFileCategoryDetailsExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { getFileCategoryDetails } from "./getFileCategoryDetails";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const CATEGORY_GUID = "3CA44CA55CA66CA77CA88CA9";
const params = () => ({
  connection: connection(),
  categoryGuid: CATEGORY_GUID,
});
describe("getFileCategoryDetails", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the category details on a 2xx", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/files/categories/${CATEGORY_GUID}`)
      .reply(200, getFileCategoryDetailsExamplePayload.data);
    const { result } = await invoke(
      getFileCategoryDetails,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(getFileCategoryDetailsExamplePayload.data);
  });
  it("throws when the category does not exist", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/files/categories/${CATEGORY_GUID}`)
      .reply(404, { errors: [{ message: "Category not found" }] });
    await expect(
      invoke(getFileCategoryDetails, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
