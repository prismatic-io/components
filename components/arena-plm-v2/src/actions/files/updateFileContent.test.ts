import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { updateFileContentExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { updateFileContent } from "./updateFileContent";
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
  fileContent: {
    data: Buffer.from("file-bytes"),
    contentType: "application/pdf",
  },
});
describe("updateFileContent", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the updated file on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/content`)
      .reply(200, updateFileContentExamplePayload.data);
    const { result } = await invoke(
      updateFileContent,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(updateFileContentExamplePayload.data);
  });
  it("throws when the content cannot be replaced", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/content`)
      .reply(417, { errors: [{ message: "File edition is locked" }] });
    await expect(
      invoke(updateFileContent, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
