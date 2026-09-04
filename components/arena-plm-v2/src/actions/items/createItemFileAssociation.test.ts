import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createItemFileAssociationExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createItemFileAssociation } from "./createItemFileAssociation";
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
  file: { data: Buffer.from("file-bytes"), contentType: "application/pdf" },
  title: "Assembly Drawing",
  description: undefined,
  format: undefined,
  isPrivate: undefined,
  authorFullName: undefined,
  categoryGuid: undefined,
  storageMethodName: undefined,
  edition: undefined,
  latestEditionAssociation: undefined,
  primary: undefined,
});
describe("createItemFileAssociation", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the item file association on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/items/${ITEM_GUID}/files`)
      .reply(200, createItemFileAssociationExamplePayload.data);
    const { result } = await invoke(
      createItemFileAssociation,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createItemFileAssociationExamplePayload.data);
  });
  it("throws when Arena rejects the association", async () => {
    nock(ARENA_HOST)
      .post(`${API}/items/${ITEM_GUID}/files`)
      .reply(404, { errors: [{ message: "Item not found" }] });
    await expect(
      invoke(createItemFileAssociation, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
