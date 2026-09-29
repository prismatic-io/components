import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import { usersGetByUsernameExamplePayload } from "../examplePayloads";
import actions from "./index";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
const { usersGetByUsername } = actions;
afterEach(() => nock.cleanAll());
describe("usersGetByUsername", () => {
  test("happy path returns the user", async () => {
    nock(BASE)
      .get("/users/octocat")
      .reply(200, usersGetByUsernameExamplePayload.data);
    const { result } = await invoke(usersGetByUsername, {
      connection: conn,
      username: "octocat",
    });
    expect(result.data).toEqual(usersGetByUsernameExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE).get("/users/ghost").reply(404, { message: "Not Found" });
    await expect(
      invoke(usersGetByUsername, {
        connection: conn,
        username: "ghost",
      }),
    ).rejects.toThrow();
  });
});
