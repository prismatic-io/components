import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listBoardsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listBoards } from "./listBoards";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listBoards, {
    jiraConnection: basicConnection(),
    filter: "my",
    pagination: { startAt: 10, maxResults: 25 },
  });

describe("listBoards", () => {
  test("forwards the filter and pagination as query parameters", async () => {
    const scope = jiraApi()
      .get("/rest/agile/1.0/board")
      .query({ startAt: "10", maxResults: "25", filter: "my" })
      .reply(200, listBoardsExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listBoardsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/agile/1.0/board")
      .query(true)
      .reply(401, { errorMessages: ["Unauthorized"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 401 } });
  });
});
