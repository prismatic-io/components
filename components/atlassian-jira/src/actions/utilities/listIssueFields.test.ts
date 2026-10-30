import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listIssueFieldsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listIssueFields } from "./listIssueFields";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listIssueFields, { jiraConnection: basicConnection() });

describe("listIssueFields", () => {
  test("returns every field Jira lists", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/field")
      .reply(200, listIssueFieldsExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listIssueFieldsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/field")
      .reply(401, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 401 } });
  });
});
