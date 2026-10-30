import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listIssueLinkTypesExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listIssueLinkTypes } from "./listIssueLinkTypes";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listIssueLinkTypes, { jiraConnection: basicConnection() });

describe("listIssueLinkTypes", () => {
  test("lists the issue link types", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/issueLinkType")
      .reply(200, listIssueLinkTypesExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listIssueLinkTypesExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/issueLinkType")
      .reply(500, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 500 } });
  });
});
