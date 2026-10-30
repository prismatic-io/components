import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getCommentsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getComments } from "./getComments";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(getComments, { jiraConnection: basicConnection(), issueId: "10201" });

describe("getComments", () => {
  test("fetches the issue's comments", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/issue/10201/comment")
      .reply(200, getCommentsExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getCommentsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/issue/10201/comment")
      .reply(404, { errorMessages: ["Issue does not exist"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
