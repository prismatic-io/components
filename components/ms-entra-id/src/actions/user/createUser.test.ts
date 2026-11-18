import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createUserExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { createUser } from "./createUser";

const params = {
  connection,
  accountEnabled: true,
  displayName: "Adele Vance",
  forceChangePasswordNextSignIn: true,
  password: "Jaka889740",
  userPrincipalName: "AdeleV",
  domain: "contoso.com",
  additionalProperties: { jobTitle: "Product Marketing Manager" },
};

describe("createUser", () => {
  afterEach(resetNock);

  test("happy path builds the UPN from alias and domain and posts the user", async () => {
    const scope = mockGraph()
      .post(`${API_PATH}/users`, {
        accountEnabled: true,
        displayName: "Adele Vance",
        passwordProfile: {
          forceChangePasswordNextSignIn: true,
          password: "Jaka889740",
        },
        mailNickname: "AdeleV",
        userPrincipalName: "AdeleV@contoso.com",
        jobTitle: "Product Marketing Manager",
      })
      .reply(201, createUserExamplePayload.data);
    const { result } = await invoke(createUser, params);
    expect(result).toEqual(createUserExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().post(`${API_PATH}/users`).reply(400, graphError);
    await expect(invoke(createUser, params)).rejects.toThrow();
  });
});
