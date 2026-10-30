import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getUserExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getUser } from "./getUser";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(getUser, {
    jiraConnection: basicConnection(),
    accountId: "5b10a2844c20165700ede21g",
    expand: "",
  });

describe("getUser", () => {
  test("reads the user by account id and omits an empty expand", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/user")
      .query(
        (query) =>
          query.accountId === "5b10a2844c20165700ede21g" &&
          !("expand" in query),
      )
      .reply(200, getUserExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getUserExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/user")
      .query(true)
      .reply(404, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
