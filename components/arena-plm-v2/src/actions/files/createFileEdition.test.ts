import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createFileEditionExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createFileEdition } from "./createFileEdition";
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
  storageMethodName: undefined,
  location: undefined,
  title: "Edition B",
  description: undefined,
  format: undefined,
});
describe("createFileEdition", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the new file edition on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/editions`)
      .reply(200, createFileEditionExamplePayload.data);
    const { result } = await invoke(
      createFileEdition,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createFileEditionExamplePayload.data);
  });
  it("throws when Arena rejects the new edition", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/editions`)
      .reply(417, {
        errors: [{ message: "File is checked out by another user" }],
      });
    await expect(
      invoke(createFileEdition, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
