import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listChangeCategoryRoutingsExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { changeCategoryRoutingsPicklist } from "./changeCategoryRoutingsPicklist";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const CATEGORY_GUID = "8CC99DD00EE11FF22GG33HH4";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  categoryGuid: CATEGORY_GUID,
});
describe("changeCategoryRoutingsPicklist", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("maps every routing to a label and key pair", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/changes/categories/${CATEGORY_GUID}/routings`)
      .reply(200, listChangeCategoryRoutingsExamplePayload.data);
    const { result } = await invokeDataSource(
      changeCategoryRoutingsPicklist,
      params(),
      createTestContext(),
    );
    const expected =
      listChangeCategoryRoutingsExamplePayload.data.results ?? [];
    expect(result).toHaveLength(expected.length);
    expect(result[0]).toEqual({
      label: expected[0].name,
      key: expected[0].guid,
    });
  });
  it("returns an empty option list when the category has no routings", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/changes/categories/${CATEGORY_GUID}/routings`)
      .reply(200, { results: [], count: 0 });
    const { result } = await invokeDataSource(
      changeCategoryRoutingsPicklist,
      params(),
      createTestContext(),
    );
    expect(result).toEqual([]);
  });
  it("propagates an HTTP failure instead of returning an empty option list", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/changes/categories/${CATEGORY_GUID}/routings`)
      .reply(404, { errors: [{ message: "Category not found" }] });
    await expect(
      invokeDataSource(
        changeCategoryRoutingsPicklist,
        params(),
        createTestContext(),
      ),
    ).rejects.toThrow(
      `Failed to get change category routings datasource for category ${CATEGORY_GUID.toLowerCase()} (Status 404)`,
    );
  });
});
