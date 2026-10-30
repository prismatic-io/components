import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listBoardsExamplePayload } from "../examplePayloads";
import { basicConnection, jiraApi } from "../testHelpers";
import boards from "./boards";

const { selectBoard, selectBoardVersion } = boards;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("selectBoard", () => {
  const params = () => ({
    jiraConnection: basicConnection(),
    startAt: 0,
    maxResults: 50,
    filter: "my",
  });

  test("maps each board to a key/label element", async () => {
    const scope = jiraApi()
      .get("/rest/agile/1.0/board")
      .query({ startAt: "0", maxResults: "50", filter: "my" })
      .reply(200, listBoardsExamplePayload.data);

    const { result } = await invokeDataSource(selectBoard, params());

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "scrum board", key: "84" },
      { label: "kanban board", key: "92" },
    ]);
  });

  test("returns an empty list when there are no boards", async () => {
    jiraApi()
      .get("/rest/agile/1.0/board")
      .query(true)
      .reply(200, { ...listBoardsExamplePayload.data, values: [] });

    const { result } = await invokeDataSource(selectBoard, params());

    expect(result).toEqual([]);
  });
});

describe("selectBoardVersion", () => {
  const params = () => ({
    jiraConnection: basicConnection(),
    boardId: "84",
    startAt: 0,
    maxResults: 50,
  });

  test("maps each board version to a key/label element", async () => {
    const versionsPage = {
      isLast: true,
      values: [
        { id: 10000, name: "Version 1.0" },
        { id: 10001, name: "Version 1.1" },
      ],
    };
    const scope = jiraApi()
      .get("/rest/agile/1.0/board/84/version")
      .query({ startAt: "0", maxResults: "50" })
      .reply(200, versionsPage);

    const { result } = await invokeDataSource(selectBoardVersion, params());

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "Version 1.0", key: "10000" },
      { label: "Version 1.1", key: "10001" },
    ]);
  });

  test("returns an empty list when the board has no versions", async () => {
    jiraApi()
      .get("/rest/agile/1.0/board/84/version")
      .query(true)
      .reply(200, { values: [] });

    const { result } = await invokeDataSource(selectBoardVersion, params());

    expect(result).toEqual([]);
  });
});
