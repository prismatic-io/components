import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createItemFromJsonExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createItemFromJson } from "./createItemFromJson";
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
  itemJson: { name: "Circuit Board Assembly", description: "Main board" },
  name: undefined,
  description: undefined,
  revisionNumber: undefined,
  categoryGuid: undefined,
  shared: undefined,
  offTheShelf: undefined,
  uom: undefined,
  productionCost: undefined,
  prototypeCost: undefined,
  targetPrice: undefined,
  targetCost: undefined,
  standardCost: undefined,
  ownerFullName: undefined,
  numberFormatGuid: undefined,
  numberFormatFields: undefined,
});
describe("createItemFromJson", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the created item on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/items`)
      .reply(200, createItemFromJsonExamplePayload.data);
    const { result } = await invoke(
      createItemFromJson,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createItemFromJsonExamplePayload.data);
  });
  it("throws when Arena rejects the merged payload", async () => {
    nock(ARENA_HOST)
      .post(`${API}/items`)
      .reply(400, { errors: [{ message: "category is required" }] });
    await expect(
      invoke(createItemFromJson, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
