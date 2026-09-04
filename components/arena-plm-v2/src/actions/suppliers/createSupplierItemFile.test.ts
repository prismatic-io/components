import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createSupplierItemFileExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createSupplierItemFile } from "./createSupplierItemFile";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const SUPPLIER_ITEM_GUID = "SI111AAA222BBB333CCC4445";
const params = () => ({
  connection: connection(),
  supplierItemGuid: SUPPLIER_ITEM_GUID,
  file: { data: Buffer.from("file-bytes"), contentType: "application/pdf" },
  title: "Supplier Datasheet",
  description: undefined,
  format: undefined,
  storageMethodName: undefined,
  categoryGuid: undefined,
  authorFullName: undefined,
  edition: undefined,
  private: undefined,
  latestEditionAssociation: undefined,
  primary: undefined,
});
describe("createSupplierItemFile", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the supplier item file association on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/supplieritems/${SUPPLIER_ITEM_GUID}/files`)
      .reply(200, createSupplierItemFileExamplePayload.data);
    const { result } = await invoke(
      createSupplierItemFile,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createSupplierItemFileExamplePayload.data);
  });
  it("throws when Arena rejects the upload", async () => {
    nock(ARENA_HOST)
      .post(`${API}/supplieritems/${SUPPLIER_ITEM_GUID}/files`)
      .reply(404, { errors: [{ message: "Supplier item not found" }] });
    await expect(
      invoke(createSupplierItemFile, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
