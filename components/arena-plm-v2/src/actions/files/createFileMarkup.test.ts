import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createFileMarkupExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createFileMarkup } from "./createFileMarkup";
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
  markupContent: {
    data: Buffer.from("file-bytes"),
    contentType: "application/pdf",
  },
  reserved: undefined,
  markupStorageMethodName: undefined,
  markupCategoryGuid: undefined,
  markupTitle: "Reviewer markup",
  markupFormat: undefined,
  markupAuthorFullName: undefined,
});
describe("createFileMarkup", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the markup association on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/markups`)
      .reply(200, createFileMarkupExamplePayload.data);
    const { result } = await invoke(
      createFileMarkup,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(createFileMarkupExamplePayload.data);
  });
  it("throws when Arena rejects the markup", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/${FILE_GUID}/markups`)
      .reply(400, { errors: [{ message: "markup.content is required" }] });
    await expect(
      invoke(createFileMarkup, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
