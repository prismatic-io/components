import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { updateSupplierFileAssociationExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { updateSupplierFileAssociation } from "./updateSupplierFileAssociation";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const SUPPLIER_GUID = "ABC123DEF456GHI789JKL012";
const ASSOCIATION_GUID = "SF100AAA200BBB300CCC4001";
const params = () => ({
  connection: connection(),
  supplierGuid: SUPPLIER_GUID,
  supplierFileAssociationGuid: ASSOCIATION_GUID,
  title: "Quality Agreement (2026)",
  description: undefined,
  edition: undefined,
  format: undefined,
  isPrivate: undefined,
  authorFullName: undefined,
  categoryGuid: undefined,
  storageMethodName: undefined,
  latestEditionAssociation: undefined,
  isPrimary: undefined,
});
describe("updateSupplierFileAssociation", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the updated association on a 2xx", async () => {
    nock(ARENA_HOST)
      .put(`${API}/suppliers/${SUPPLIER_GUID}/files/${ASSOCIATION_GUID}`)
      .reply(200, updateSupplierFileAssociationExamplePayload.data);
    const { result } = await invoke(
      updateSupplierFileAssociation,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(
      updateSupplierFileAssociationExamplePayload.data,
    );
  });
  it("throws when the association does not exist", async () => {
    nock(ARENA_HOST)
      .put(`${API}/suppliers/${SUPPLIER_GUID}/files/${ASSOCIATION_GUID}`)
      .reply(404, { errors: [{ message: "File association not found" }] });
    await expect(
      invoke(updateSupplierFileAssociation, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
