import { invoke } from "@prismatic-io/spectral/dist/testing";
import { SUCCESS_RESPONSE } from "../../constants";
import { getUserExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { updateUser } from "./updateUser";

const USER_ID = getUserExamplePayload.data.id;

const userFields = {
  accountEnabled: undefined,
  displayName: "Adele Vance",
  userPrincipalName: "AdeleV",
  domain: "contoso.com",
  givenName: undefined,
  surname: undefined,
  jobTitle: "Retail Manager",
};

describe("updateUser", () => {
  afterEach(resetNock);

  test("happy path patches the user and returns the success response on 204", async () => {
    const scope = mockGraph()
      .patch(`${API_PATH}/users/${USER_ID}`, {
        displayName: "Adele Vance",
        userPrincipalName: "AdeleV@contoso.com",
        jobTitle: "Retail Manager",
      })
      .reply(204);
    const { result } = await invoke(updateUser, {
      connection,
      userId: USER_ID,
      userFields,
      additionalProperties: undefined,
    });
    expect(result).toEqual({ data: SUCCESS_RESPONSE });
    expect(scope.isDone()).toBe(true);
  });

  test("throws before any request when only one of Domain and User Principal Name is set", async () => {
    await expect(
      invoke(updateUser, {
        connection,
        userId: USER_ID,
        userFields: { ...userFields, domain: "" },
        additionalProperties: undefined,
      }),
    ).rejects.toThrow(
      "'Domain' and 'User Principal Name' inputs must be provided together.",
    );
  });

  test("error path surfaces the failure", async () => {
    mockGraph().patch(`${API_PATH}/users/${USER_ID}`).reply(404, graphError);
    await expect(
      invoke(updateUser, {
        connection,
        userId: USER_ID,
        userFields,
        additionalProperties: undefined,
      }),
    ).rejects.toThrow();
  });
});
