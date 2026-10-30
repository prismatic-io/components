import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { findProjectExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { findProject } from "./findProject";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const exampleProject = findProjectExamplePayload.data[0];
const otherProject = {
  ...exampleProject,
  id: "10001",
  key: "OPS",
  name: "Operations Example",
};

const find = (searchType: string, searchValue: string) =>
  invoke(findProject, {
    jiraConnection: basicConnection(),
    searchType,
    searchValue,
  });

const search = (query: string) =>
  jiraApi()
    .get("/rest/api/3/project/search")
    .query({ query })
    .reply(200, {
      isLast: true,
      startAt: 0,
      total: 2,
      values: [exampleProject, otherProject],
    });

describe("findProject", () => {
  test("keeps only the projects whose key contains the value when searching by key", async () => {
    const scope = search("ex");

    const { result } = await find("key", "ex");

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual([exampleProject]);
  });

  test("keeps only the projects whose name contains the value when searching by name", async () => {
    const scope = search("example");

    const { result } = await find("name", "example");

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual([exampleProject, otherProject]);
  });

  test("returns an empty list when nothing matches the selected field", async () => {
    search("ops");

    const { result } = await find("name", "ops");

    expect(result.data).toEqual([]);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/project/search")
      .query(true)
      .reply(401, { errorMessages: ["unauthorized"] });

    await expect(find("key", "proj")).rejects.toMatchObject({
      response: { status: 401 },
    });
  });
});
