import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createQualityProcessStepAffectedUrlExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createQualityProcessStepAffectedUrl } from "./createQualityProcessStepAffectedUrl";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const connection = () =>
  createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  });
const QP_GUID = "QP111AAA222BBB333CCC4445";
const STEP_GUID = "QS111AAA222BBB333CCC4445";
const params = () => ({
  connection: connection(),
  qualityProcessGuid: QP_GUID,
  stepGuid: STEP_GUID,
  guid: undefined,
  link: "https://example.com/inspection-report",
  display: undefined,
  description: undefined,
});
describe("createQualityProcessStepAffectedUrl", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the affected URL object on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/qualityprocesses/${QP_GUID}/steps/${STEP_GUID}/affected`)
      .reply(200, createQualityProcessStepAffectedUrlExamplePayload.data);
    const { result } = await invoke(
      createQualityProcessStepAffectedUrl,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(
      createQualityProcessStepAffectedUrlExamplePayload.data,
    );
  });
  it("throws when Arena rejects the affected object", async () => {
    nock(ARENA_HOST)
      .post(`${API}/qualityprocesses/${QP_GUID}/steps/${STEP_GUID}/affected`)
      .reply(400, {
        errors: [{ message: "affected.link is not a valid URL" }],
      });
    await expect(
      invoke(
        createQualityProcessStepAffectedUrl,
        params(),
        createTestContext(),
      ),
    ).rejects.toThrow();
  });
});
