import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listBoardsExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { listBoards } from "./listBoards";
const PATH = `${V1}/boards/list`;
const params = {
  connection: testConnection,
};
describe("listBoards", () => {
  afterEach(() => nock.cleanAll());
  test("returns every board", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listBoardsExamplePayload.data);
    const { result } = await invoke(listBoards, params);
    expect(captured.body).toStrictEqual({ apiKey: "test-api-key" });
    expect(result.data).toStrictEqual(listBoardsExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listBoards, params)).rejects.toThrow();
  });
});
