import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { describe, expect, test } from "vitest";
import { oauthClientCredentials, templatedOauth } from "../connections";
import { PLANNER_ENDPOINTS } from "../constants";
import {
  computeEndpointBasedOnConnection,
  isClientCredentials,
  validateConnection,
} from "./connection";
const USER_ID = "48d31887-5fad-4d73-a9f5-3c356e68a038";
const authCode = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const clientCredentials = createConnection(
  oauthClientCredentials,
  { userId: USER_ID },
  { access_token: "test-token" },
);
const clientCredentialsNoUser = createConnection(
  oauthClientCredentials,
  {},
  { access_token: "test-token" },
);
describe("isClientCredentials", () => {
  test("distinguishes the unattended connection from the authorization code one", () => {
    expect(isClientCredentials(clientCredentials)).toBe(true);
    expect(isClientCredentials(authCode)).toBe(false);
  });
});
describe("computeEndpointBasedOnConnection", () => {
  test("returns the path unchanged on an authorization code connection", () => {
    expect(
      computeEndpointBasedOnConnection(authCode, PLANNER_ENDPOINTS.USER_TASKS),
    ).toBe("/me/planner/tasks");
    expect(
      computeEndpointBasedOnConnection(
        authCode,
        PLANNER_ENDPOINTS.MEMBER_OF_GROUPS,
      ),
    ).toBe("/me/memberOf/microsoft.graph.group");
  });
  test("rewrites a leading /me segment to /users/{userId} on a client credentials connection", () => {
    expect(
      computeEndpointBasedOnConnection(
        clientCredentials,
        PLANNER_ENDPOINTS.USER_TASKS,
      ),
    ).toBe(`/users/${USER_ID}/planner/tasks`);
    expect(
      computeEndpointBasedOnConnection(
        clientCredentials,
        PLANNER_ENDPOINTS.USER_PLANS,
      ),
    ).toBe(`/users/${USER_ID}/planner/plans`);
  });
  test("rewrites a bare /me path with nothing after it", () => {
    expect(computeEndpointBasedOnConnection(clientCredentials, "/me")).toBe(
      `/users/${USER_ID}`,
    );
  });
  test("leaves a segment that merely starts with 'me' alone", () => {
    expect(
      computeEndpointBasedOnConnection(clientCredentials, "/members"),
    ).toBe("/members");
    expect(
      computeEndpointBasedOnConnection(clientCredentials, "/meetings/123"),
    ).toBe("/meetings/123");
  });
  test("leaves a /me that is not the leading segment alone", () => {
    expect(
      computeEndpointBasedOnConnection(clientCredentials, "/groups/me/plans"),
    ).toBe("/groups/me/plans");
  });
  test("throws a ConnectionError when the client credentials connection has no User ID", () => {
    expect(() =>
      computeEndpointBasedOnConnection(
        clientCredentialsNoUser,
        PLANNER_ENDPOINTS.USER_TASKS,
      ),
    ).toThrow(ConnectionError);
    expect(() =>
      computeEndpointBasedOnConnection(
        clientCredentialsNoUser,
        PLANNER_ENDPOINTS.USER_TASKS,
      ),
    ).toThrow(/requires a User ID/);
  });
});
describe("validateConnection", () => {
  test("accepts a connection carrying an access token", () => {
    expect(() => validateConnection(authCode)).not.toThrow();
  });
  test("throws a ConnectionError when the connection produced no access token", () => {
    const noToken = createConnection(templatedOauth, {});
    expect(() => validateConnection(noToken)).toThrow(ConnectionError);
    expect(() => validateConnection(noToken)).toThrow(
      /No access token was found/,
    );
  });
  test("throws when the token object is present but the access token is blank", () => {
    const blankToken = createConnection(
      templatedOauth,
      {},
      { access_token: "" },
    );
    expect(() => validateConnection(blankToken)).toThrow(ConnectionError);
  });
});
