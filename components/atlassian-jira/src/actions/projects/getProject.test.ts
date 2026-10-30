import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getProjectExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getProject } from "./getProject";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const get = () =>
  invoke(getProject, { jiraConnection: basicConnection(), projectId: "10000" });

describe("getProject", () => {
  test("reads the project addressed by its id in the path", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/project/10000")
      .reply(200, getProjectExamplePayload.data);

    const { result } = await get();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getProjectExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/project/10000")
      .reply(404, { errorMessages: ["not found"] });

    await expect(get()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
