import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  listIssueCustomFieldsExamplePayload,
  listIssueFieldsExamplePayload,
} from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listIssueCustomFields } from "./listIssueCustomFields";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listIssueCustomFields, { jiraConnection: basicConnection() });

describe("listIssueCustomFields", () => {
  test("keeps only the fields Jira marks as custom", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/field")
      .reply(200, [
        ...listIssueFieldsExamplePayload.data,
        ...listIssueCustomFieldsExamplePayload.data,
      ]);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listIssueCustomFieldsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/field")
      .reply(401, { errorMessages: ["unauthorized"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 401 } });
  });
});
