import { describe, expect, test, afterEach } from "vitest";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getCurrentUser } from "./getCurrentUser";
import { calendlyOauth2Connection } from "../../connections";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { LIVE_API_URL } from "../../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
describe("getCurrentUser", () => {
  afterEach(() => nock.cleanAll());
  test("happy path returns authenticated user data", async () => {
    nock(BASE).get("/users/me").reply(200, getCurrentUserExamplePayload.data);
    const { result } = await invoke(getCurrentUser, {
      connection: conn,
    });
    expect(result.data).toEqual(getCurrentUserExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE).get("/users/me").reply(401, { title: "Unauthenticated" });
    await expect(
      invoke(getCurrentUser, { connection: conn }),
    ).rejects.toThrow();
  });
});
