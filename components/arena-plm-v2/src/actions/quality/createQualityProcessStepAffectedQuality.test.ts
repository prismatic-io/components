import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createQualityProcessStepAffectedQualityExamplePayload } from "../../examplePayloads";
import { createTestContext } from "../../tests/testContext";
import { createQualityProcessStepAffectedQuality } from "./createQualityProcessStepAffectedQuality";
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
  affectedStepGuid: "QS222BBB333CCC444DDD5556",
});
describe("createQualityProcessStepAffectedQuality", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the affected quality object on a 2xx", async () => {
    nock(ARENA_HOST)
      .post(`${API}/qualityprocesses/${QP_GUID}/steps/${STEP_GUID}/affected`)
      .reply(200, createQualityProcessStepAffectedQualityExamplePayload.data);
    const { result } = await invoke(
      createQualityProcessStepAffectedQuality,
      params(),
      createTestContext(),
    );
    expect(result.data).toEqual(
      createQualityProcessStepAffectedQualityExamplePayload.data,
    );
  });
  it("throws when Arena rejects the affected object", async () => {
    nock(ARENA_HOST)
      .post(`${API}/qualityprocesses/${QP_GUID}/steps/${STEP_GUID}/affected`)
      .reply(404, { errors: [{ message: "Step not found" }] });
    await expect(
      invoke(
        createQualityProcessStepAffectedQuality,
        params(),
        createTestContext(),
      ),
    ).rejects.toThrow();
  });
});
