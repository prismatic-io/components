import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listBoardsSprintsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listBoardsSprints } from "./listBoardsSprints";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listBoardsSprints, {
    jiraConnection: basicConnection(),
    boardId: "84",
    pagination: { startAt: 10, maxResults: 25 },
  });

describe("listBoardsSprints", () => {
  test("lists the board's sprints with pagination", async () => {
    const scope = jiraApi()
      .get("/rest/agile/1.0/board/84/sprint")
      .query({ boardId: "84", startAt: "10", maxResults: "25" })
      .reply(200, listBoardsSprintsExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listBoardsSprintsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/agile/1.0/board/84/sprint")
      .query(true)
      .reply(400, { errorMessages: ["The board does not support sprints"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
