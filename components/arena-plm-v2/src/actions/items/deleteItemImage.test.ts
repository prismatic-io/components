import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { deleteItemImageExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { deleteItemImage } from "./deleteItemImage";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const ITEM_GUID = "IT111ABC222DEF333GHI4445";
const params = () => ({
  connection: connection(),
  itemGuid: ITEM_GUID,
});
describe("deleteItemImage", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("builds the delete confirmation rather than passing the empty body through", async () => {
    nock(ARENA_HOST).delete(`${API}/items/${ITEM_GUID}/image`).reply(204);
    const { result } = await invoke(
      deleteItemImage,
      params(),
      createTestContext(),
    );
    expect(result).toEqual(deleteItemImageExamplePayload);
  });
  it("throws when the image cannot be removed", async () => {
    nock(ARENA_HOST)
      .delete(`${API}/items/${ITEM_GUID}/image`)
      .reply(404, { errors: [{ message: "Item has no image" }] });
    await expect(
      invoke(deleteItemImage, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
