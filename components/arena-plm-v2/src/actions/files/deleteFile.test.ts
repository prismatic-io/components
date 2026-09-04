import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { deleteFileExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { deleteFile } from "./deleteFile";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const FILE_GUID = "F1LE23DEF456GHI789JKL012";
const params = () => ({
  connection: connection(),
  fileGuid: FILE_GUID,
});
describe("deleteFile", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("builds the delete confirmation rather than passing the empty body through", async () => {
    nock(ARENA_HOST).delete(`${API}/files/${FILE_GUID}`).reply(204);
    const { result } = await invoke(deleteFile, params(), createTestContext());
    expect(result).toEqual(deleteFileExamplePayload);
  });
  it("throws when the file cannot be deleted", async () => {
    nock(ARENA_HOST)
      .delete(`${API}/files/${FILE_GUID}`)
      .reply(417, {
        errors: [
          { message: "Only the latest unlocked edition can be deleted" },
        ],
      });
    await expect(
      invoke(deleteFile, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
