import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { findUserExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { findUser } from "./findUser";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(findUser, { jiraConnection: basicConnection(), searchValue: "jane" });

describe("findUser", () => {
  test("searches users by the value", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/user/search")
      .query({ query: "jane" })
      .reply(200, findUserExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(findUserExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/user/search")
      .query(true)
      .reply(400, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
