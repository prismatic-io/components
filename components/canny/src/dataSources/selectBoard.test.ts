import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listBoardsExamplePayload } from "../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../testHelpers";
import { selectBoard } from "./selectBoard";
const BOARDS_LIST = `${V1}/boards/list`;
describe("selectBoard", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key pairs sorted by label", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(BOARDS_LIST, matcher)
      .reply(200, listBoardsExamplePayload.data);
    const { result } = await invokeDataSource(selectBoard, {
      connection: testConnection,
    });
    expect(captured.body).toStrictEqual({ apiKey: "test-api-key" });
    expect(result).toStrictEqual([
      { label: "Bug Reports", key: "553c3ef8b8cdcd1501ba1238" },
      { label: "Feature Requests", key: "553c3ef8b8cdcd1501ba1234" },
    ]);
  });
  test("returns an empty picklist when the account has no boards", async () => {
    nock(CANNY_HOST).post(BOARDS_LIST).reply(200, { boards: [] });
    const { result } = await invokeDataSource(selectBoard, {
      connection: testConnection,
    });
    expect(result).toStrictEqual([]);
  });
});
