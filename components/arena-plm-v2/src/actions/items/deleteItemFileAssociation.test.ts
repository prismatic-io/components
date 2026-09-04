import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { deleteItemFileAssociationExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { deleteItemFileAssociation } from "./deleteItemFileAssociation";
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
const ASSOCIATION_GUID = "IF100AAA200BBB300CCC4001";
const params = () => ({
  connection: connection(),
  itemGuid: ITEM_GUID,
  itemFileAssociationGuid: ASSOCIATION_GUID,
});
describe("deleteItemFileAssociation", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("builds the delete confirmation from the GUIDs it was given", async () => {
    nock(ARENA_HOST)
      .delete(`${API}/items/${ITEM_GUID}/files/${ASSOCIATION_GUID}`)
      .reply(204);
    const { result } = await invoke(
      deleteItemFileAssociation,
      params(),
      createTestContext(),
    );
    expect(result).toEqual(deleteItemFileAssociationExamplePayload);
  });
  it("throws when the association cannot be deleted", async () => {
    nock(ARENA_HOST)
      .delete(`${API}/items/${ITEM_GUID}/files/${ASSOCIATION_GUID}`)
      .reply(404, { errors: [{ message: "File association not found" }] });
    await expect(
      invoke(deleteItemFileAssociation, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
