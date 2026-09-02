import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { retrieveBoardExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { retrieveBoard } from "./retrieveBoard";
const PATH = `${V1}/boards/retrieve`;
const params = {
  connection: testConnection,
  id: "553c3ef8b8cdcd1501ba1234",
};
describe("retrieveBoard", () => {
  afterEach(() => nock.cleanAll());
  test("retrieves one board by ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, retrieveBoardExamplePayload.data);
    const { result } = await invoke(retrieveBoard, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba1234",
    });
    expect(result.data).toStrictEqual(retrieveBoardExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "board not found" });
    await expect(invoke(retrieveBoard, params)).rejects.toThrow();
  });
});
