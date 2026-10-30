import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getBoardExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getBoard } from "./getBoard";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(getBoard, { jiraConnection: basicConnection(), boardId: "84" });

describe("getBoard", () => {
  test("fetches the board from the Agile API", async () => {
    const scope = jiraApi()
      .get("/rest/agile/1.0/board/84")
      .reply(200, getBoardExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getBoardExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/agile/1.0/board/84")
      .reply(404, { errorMessages: ["Board does not exist"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
