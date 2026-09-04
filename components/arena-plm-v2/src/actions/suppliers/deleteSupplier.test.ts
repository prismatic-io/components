import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createTestContext } from "../../tests/testContext";
import { deleteSupplier } from "./deleteSupplier";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const SUPPLIER_GUID = "ABC123DEF456GHI789JKL012";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  supplierGuid: SUPPLIER_GUID,
});
describe("deleteSupplier", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("throws rather than reporting success when Arena rejects the delete", async () => {
    nock(ARENA_HOST)
      .delete(`${API}/suppliers/${SUPPLIER_GUID}`)
      .reply(417, {
        errors: [{ message: "Supplier has active supplier items" }],
      });
    await expect(
      invoke(deleteSupplier, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
