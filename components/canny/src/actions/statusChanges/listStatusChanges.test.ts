import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listStatusChangesExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V2 } from "../../testHelpers";
import { listStatusChanges } from "./listStatusChanges";
const PATH = `${V2}/status_changes/list`;
const params = {
  connection: testConnection,
  boardId: "553c3ef8b8cdcd1501ba1234",
  fetchAll: false,
  pagination: { cursor: "next_abc123def456", limit: 10 },
};
describe("listStatusChanges", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of status changes from the cursor", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listStatusChangesExamplePayload.data);
    const { result } = await invoke(listStatusChanges, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      cursor: "next_abc123def456",
      limit: 10,
    });
    expect(result.data).toStrictEqual(listStatusChangesExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listStatusChanges, params)).rejects.toThrow();
  });
});
