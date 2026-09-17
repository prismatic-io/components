import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createActivityClient, createClient } from "./client";
import { connection as connectionDefinition } from "./connections";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const ACTIVITY = "https://driveactivity.googleapis.com";
describe("createClient", () => {
  afterEach(() => nock.cleanAll());
  test("targets the Drive v3 API and forwards the connection's access token", async () => {
    const scope = nock(DRIVE, {
      reqheaders: { authorization: "Bearer test-token" },
    })
      .get("/drive/v3/about")
      .query(true)
      .reply(200, { user: { displayName: "Jane Doe" } });
    const drive = createClient(connection);
    const { data } = await drive.about.get({ fields: "user" });
    expect(data).toEqual({ user: { displayName: "Jane Doe" } });
    expect(scope.isDone()).toBe(true);
  });
  test("throws a ConnectionError when the token carries no access token", () => {
    const tokenless = createConnection(connectionDefinition, {}, {});
    expect(() => createClient(tokenless)).toThrow(ConnectionError);
  });
  test("throws a TypeError when the connection carries no token object", () => {
    const untokened = {
      key: "oauth2",
      configVarKey: "",
      fields: {},
    } as unknown as Connection;
    expect(() => createClient(untokened)).toThrow(TypeError);
  });
});
describe("createActivityClient", () => {
  afterEach(() => nock.cleanAll());
  test("targets the Drive Activity v2 API and forwards the connection's access token", async () => {
    const scope = nock(ACTIVITY, {
      reqheaders: { authorization: "Bearer test-token" },
    })
      .post("/v2/activity:query")
      .reply(200, { activities: [] });
    const activity = createActivityClient(connection);
    const { data } = await activity.activity.query({ requestBody: {} });
    expect(data).toEqual({ activities: [] });
    expect(scope.isDone()).toBe(true);
  });
});
