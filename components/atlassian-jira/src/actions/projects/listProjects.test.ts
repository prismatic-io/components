import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listProjects } from "./listProjects";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const list = () =>
  invoke(listProjects, {
    jiraConnection: basicConnection(),
    pagination: { startAt: 20, maxResults: 10 },
  });

describe("listProjects", () => {
  test("forwards the pagination and returns only the values array", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/project/search")
      .query({ startAt: "20", maxResults: "10" })
      .reply(200, {
        isLast: true,
        startAt: 20,
        total: 21,
        values: listProjectsExamplePayload.data,
      });

    const { result } = await list();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listProjectsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/project/search")
      .query(true)
      .reply(500, { errorMessages: ["boom"] });

    await expect(list()).rejects.toMatchObject({ response: { status: 500 } });
  });
});
