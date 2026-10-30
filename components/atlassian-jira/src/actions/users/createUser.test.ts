import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createUserExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { createUser } from "./createUser";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const create = () =>
  invoke(createUser, {
    jiraConnection: basicConnection(),
    emailAddress: "mia.krystof@example.com",
    username: "mia.krystof",
    password: "",
    notifications: false,
    displayName: "Mia Krystof",
    dynamicValues: {},
    fieldValues: {},
  });

describe("createUser", () => {
  test("creates the user through the platform REST API", async () => {
    const scope = jiraApi()
      .post(
        "/rest/api/3/user",
        (body) => body.emailAddress === "mia.krystof@example.com",
      )
      .reply(201, createUserExamplePayload.data);

    const { result } = await create();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createUserExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .post("/rest/api/3/user")
      .reply(400, { errorMessages: ["bad request"] });

    await expect(create()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
