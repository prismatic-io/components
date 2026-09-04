import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createFileWithContentExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createFileWithContent } from "./createFileWithContent";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const params = () => ({
  connection: connection(),
  file: { data: Buffer.from("file-bytes"), contentType: "application/pdf" },
  title: "Assembly Drawing",
  description: undefined,
  format: undefined,
  storageMethodName: undefined,
  categoryGuid: undefined,
  authorFullName: undefined,
  edition: undefined,
  private: undefined,
});
describe("createFileWithContent", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the created file on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files`)
      .reply(200, createFileWithContentExamplePayload.data);
    const { result } = await invoke(
      createFileWithContent,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createFileWithContentExamplePayload.data);
  });
  it("throws when Arena rejects the upload", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files`)
      .reply(422, { errors: [{ message: "Category is required" }] });
    await expect(
      invoke(createFileWithContent, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
