import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getCurrentUser } from "./getCurrentUser";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () => invoke(getCurrentUser, { jiraConnection: basicConnection() });

describe("getCurrentUser", () => {
  test("reads the authenticated user", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/myself")
      .reply(200, getCurrentUserExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getCurrentUserExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/myself")
      .reply(401, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 401 } });
  });
});
