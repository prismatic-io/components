import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listCategoriesExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { categoriesPicklist } from "./categoriesPicklist";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const OBJECT_TYPE = "items";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  objectType: OBJECT_TYPE,
  path: undefined,
  includeDeleted: undefined,
  assignable: undefined,
});
describe("categoriesPicklist", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("maps every category to a label and key pair", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/${OBJECT_TYPE}/categories`)
      .reply(200, listCategoriesExamplePayload.data);
    const { result } = await invokeDataSource(
      categoriesPicklist,
      params(),
      createTestContext(),
    );
    const expected = listCategoriesExamplePayload.data.results ?? [];
    expect(result).toHaveLength(expected.length);
    for (const option of result) {
      expect(option).toEqual(
        expect.objectContaining({
          label: expect.any(String),
          key: expect.any(String),
        }),
      );
    }
    expect(result[0]).toEqual({
      label: expected[0].name,
      key: expected[0].guid,
    });
  });
  it("returns an empty option list when Arena has no categories", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/${OBJECT_TYPE}/categories`)
      .reply(200, { results: [], count: 0 });
    const { result } = await invokeDataSource(
      categoriesPicklist,
      params(),
      createTestContext(),
    );
    expect(result).toEqual([]);
  });
  it("propagates an HTTP failure instead of returning an empty option list", async () => {
    nock(ARENA_HOST)
      .get(`${API}/settings/${OBJECT_TYPE}/categories`)
      .reply(403, { errors: [{ message: "Insufficient permissions" }] });
    await expect(
      invokeDataSource(categoriesPicklist, params(), createTestContext()),
    ).rejects.toThrow(
      `Failed to get ${OBJECT_TYPE} categories datasource (Status 403)`,
    );
  });
});
