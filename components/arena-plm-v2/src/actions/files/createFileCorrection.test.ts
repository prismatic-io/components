import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createFileCorrectionExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createFileCorrection } from "./createFileCorrection";
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
  content: { data: Buffer.from("file-bytes"), contentType: "application/pdf" },
  comments: "Replaced the mis-scanned page 3",
  storageMethodName: undefined,
  removeOriginalContent: undefined,
  haveContent: undefined,
});
describe("createFileCorrection", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the correction on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/corrections`)
      .reply(200, createFileCorrectionExamplePayload.data);
    const { result } = await invoke(
      createFileCorrection,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createFileCorrectionExamplePayload.data);
  });
  it("throws when Arena rejects the correction", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/corrections`)
      .reply(417, { errors: [{ message: "Latest edition is locked" }] });
    await expect(
      invoke(createFileCorrection, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
