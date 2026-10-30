import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listVersionsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listVersions } from "./listVersions";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listVersions, {
    jiraConnection: basicConnection(),
    projectId: "10000",
    pagination: { startAt: 0, maxResults: 50 },
  });

describe("listVersions", () => {
  test("lists versions for the project with the cleaned page values", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/project/10000/version")
      .query({ startAt: "0", maxResults: "50" })
      .reply(200, listVersionsExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listVersionsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/project/10000/version")
      .query(true)
      .reply(404, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
