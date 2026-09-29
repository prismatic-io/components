import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import {
  orgsListForAuthenticatedUserExamplePayload,
  usersGetAuthenticatedExamplePayload,
} from "../examplePayloads";
import actions from "./index";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
const { usersGetAuthenticated, orgsListForAuthenticatedUser } = actions;
afterEach(() => nock.cleanAll());
describe("usersGetAuthenticated", () => {
  test("happy path returns the authenticated user", async () => {
    nock(BASE)
      .get("/user")
      .reply(200, usersGetAuthenticatedExamplePayload.data);
    const { result } = await invoke(usersGetAuthenticated, {
      connection: conn,
    });
    expect(result.data).toEqual(usersGetAuthenticatedExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE).get("/user").reply(401, { message: "Bad credentials" });
    await expect(
      invoke(usersGetAuthenticated, { connection: conn }),
    ).rejects.toThrow();
  });
});
describe("orgsListForAuthenticatedUser", () => {
  test("happy path returns the user's organizations", async () => {
    nock(BASE)
      .get("/user/orgs")
      .query(true)
      .reply(200, orgsListForAuthenticatedUserExamplePayload.data);
    const { result } = await invoke(orgsListForAuthenticatedUser, {
      connection: conn,
      pagination: { page: 1, perPage: 30 },
    });
    expect(result.data).toEqual(
      orgsListForAuthenticatedUserExamplePayload.data,
    );
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/user/orgs")
      .query(true)
      .reply(401, { message: "Bad credentials" });
    await expect(
      invoke(orgsListForAuthenticatedUser, {
        connection: conn,
        pagination: { page: 1, perPage: 30 },
      }),
    ).rejects.toThrow();
  });
});
