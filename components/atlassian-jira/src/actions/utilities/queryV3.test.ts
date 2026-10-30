import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { queryV3ExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { queryV3 } from "./queryV3";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(queryV3, {
    jiraConnection: basicConnection(),
    searchString: "project = PROJ",
    expand: "names",
    maxResults: 25,
  });

describe("queryV3", () => {
  test("runs the JQL query unchanged", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/search/jql")
      .query({ jql: "project = PROJ", expand: "names", maxResults: "25" })
      .reply(200, queryV3ExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(queryV3ExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/search/jql")
      .query(true)
      .reply(400, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
