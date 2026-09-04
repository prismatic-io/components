import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { changeFileCheckoutStatusExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { changeFileCheckoutStatus } from "./changeFileCheckoutStatus";
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
  fileCheckoutData: { guid: "F1LE23DEF456GHI789JKL012", checkin: true },
  fileContent: {
    data: Buffer.from("file-bytes"),
    contentType: "application/pdf",
  },
});
describe("changeFileCheckoutStatus", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the checked-in file edition on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/checkoutstatuschanges`)
      .reply(200, changeFileCheckoutStatusExamplePayload.data);
    const { result } = await invoke(
      changeFileCheckoutStatus,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(changeFileCheckoutStatusExamplePayload.data);
  });
  it("throws when Arena rejects the checkin", async () => {
    nock(ARENA_HOST)
      .post(`${API}/files/checkoutstatuschanges`)
      .reply(417, { errors: [{ message: "File is not checked out" }] });
    await expect(
      invoke(changeFileCheckoutStatus, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
