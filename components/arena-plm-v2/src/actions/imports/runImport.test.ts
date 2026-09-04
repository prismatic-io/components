import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { runImportExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { runImport } from "./runImport";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const IMPORT_GUID = "IM111AAA222BBB333CCC4445";
const params = () => ({
  connection: connection(),
  importGuid: IMPORT_GUID,
  submitContent: {
    data: Buffer.from("file-bytes"),
    contentType: "application/pdf",
  },
  fileContent: undefined,
  submitFileType: undefined,
  commit: undefined,
  submitWorksheetName: undefined,
  debug: undefined,
  actor: undefined,
});
describe("runImport", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the started import run on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/imports/${IMPORT_GUID}/runs`)
      .reply(200, runImportExamplePayload.data);
    const { result } = await invoke(runImport, params(), createTestContext());
    expect(result.data).toEqual(runImportExamplePayload.data);
  });
  it("throws when Arena rejects the run", async () => {
    nock(ARENA_HOST)
      .post(`${API}/imports/${IMPORT_GUID}/runs`)
      .reply(417, { errors: [{ message: "Import definition is inactive" }] });
    await expect(
      invoke(runImport, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
