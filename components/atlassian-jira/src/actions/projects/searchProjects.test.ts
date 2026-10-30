import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { searchProjectsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { searchProjects } from "./searchProjects";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const search = () =>
  invoke(searchProjects, {
    jiraConnection: basicConnection(),
    searchString: "Example",
  });

describe("searchProjects", () => {
  test("searches projects by the text and returns only the values array", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/project/search")
      .query({ query: "Example" })
      .reply(200, {
        isLast: true,
        startAt: 0,
        total: 1,
        values: searchProjectsExamplePayload.data,
      });

    const { result } = await search();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(searchProjectsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/project/search")
      .query(true)
      .reply(400, { errorMessages: ["bad request"] });

    await expect(search()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
