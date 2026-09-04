import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createItemImageExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createItemImage } from "./createItemImage";
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
  content: Buffer.from("image-bytes").toString("base64"),
  filename: undefined,
});
describe("createItemImage", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the stored thumbnail on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/items/${ITEM_GUID}/image`)
      .reply(200, createItemImageExamplePayload.data);
    const { result } = await invoke(
      createItemImage,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createItemImageExamplePayload.data);
  });
  it("throws when Arena rejects the image", async () => {
    nock(ARENA_HOST)
      .post(`${API}/items/${ITEM_GUID}/image`)
      .reply(417, { errors: [{ message: "Unsupported image format" }] });
    await expect(
      invoke(createItemImage, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
