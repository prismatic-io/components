import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listCategoryAttributesExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { categoryAttributesObjectSelection } from "./categoryAttributesObjectSelection";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const OBJECT_TYPE = "items";
const CATEGORY_GUID = "3CA44CA55CA66CA77CA88CA9";
const ENDPOINT = `${API}/settings/${OBJECT_TYPE}/categories/${CATEGORY_GUID}/attributes`;
const params = (includeInactive = false) => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  objectType: OBJECT_TYPE,
  categoryGuid: CATEGORY_GUID,
  includeInactive,
});
describe("categoryAttributesObjectSelection", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("maps each active attribute to a selectable object with its field list", async () => {
    nock(ARENA_HOST)
      .get(ENDPOINT)
      .reply(200, listCategoryAttributesExamplePayload.data);
    const { result } = await invokeDataSource(
      categoryAttributesObjectSelection,
      params(),
      createTestContext(),
    );
    const active = (
      listCategoryAttributesExamplePayload.data.results ?? []
    ).filter((attribute) => attribute.active);
    expect(result).toHaveLength(active.length);
    for (const entry of result) {
      expect(entry.object).toHaveProperty("key");
      expect(entry.object).toHaveProperty("label");
      expect(Array.isArray(entry.fields)).toBe(true);
    }
    expect(result[0].object).toEqual({
      key: active[0].guid,
      label: active[0].name,
    });
  });
  it("returns an empty selection when the category has no attributes", async () => {
    nock(ARENA_HOST).get(ENDPOINT).reply(200, { results: [], count: 0 });
    const { result } = await invokeDataSource(
      categoryAttributesObjectSelection,
      params(),
      createTestContext(),
    );
    expect(result).toEqual([]);
  });
  it("propagates an HTTP failure instead of returning an empty selection", async () => {
    nock(ARENA_HOST)
      .get(ENDPOINT)
      .reply(404, { errors: [{ message: "Category not found" }] });
    await expect(
      invokeDataSource(
        categoryAttributesObjectSelection,
        params(),
        createTestContext(),
      ),
    ).rejects.toThrow();
  });
});
