import type { Connection } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  accountIsActiveFn,
  assertTeamIdForOrgToken,
  getApiBaseUrl,
} from "./client";
jest.mock("@prismatic-io/spectral/dist/clients/http", () => ({
  createClient: jest.fn(),
}));
const mockCreateClient = createClient as jest.MockedFunction<
  typeof createClient
>;
const conn = (
  token: Record<string, unknown>,
  tokenUrl = "https://slack.com/api/oauth.v2.access",
): Connection =>
  ({
    key: "oauth2",
    configVarKey: "",
    fields: { tokenUrl },
    token,
  }) as unknown as Connection;
describe("getApiBaseUrl", () => {
  it("derives the commercial host", () => {
    expect(getApiBaseUrl({ slackConnection: conn({}) })).toBe(
      "https://slack.com/api",
    );
  });
  it("derives the gov host", () => {
    expect(
      getApiBaseUrl({
        slackConnection: conn({}, "https://slack-gov.com/api/oauth.v2.access"),
      }),
    ).toBe("https://slack-gov.com/api");
  });
  it("falls back when the token url is missing", () => {
    expect(getApiBaseUrl({ slackConnection: conn({}, "") })).toBe(
      "https://slack.com/api",
    );
  });
});
describe("assertTeamIdForOrgToken", () => {
  it("does not throw on a workspace install with no team id", () => {
    expect(() =>
      assertTeamIdForOrgToken(conn({ team: { id: "T1" } }), "", "users.list"),
    ).not.toThrow();
  });
  it("does not throw on a workspace install inside a grid org", () => {
    expect(() =>
      assertTeamIdForOrgToken(
        conn({ enterprise: { id: "E1" }, is_enterprise_install: false }),
        undefined,
        "users.list",
      ),
    ).not.toThrow();
  });
  it("does not throw on an org install when a team id is supplied", () => {
    expect(() =>
      assertTeamIdForOrgToken(
        conn({ is_enterprise_install: true, enterprise: { id: "E1" } }),
        "T1",
        "users.list",
      ),
    ).not.toThrow();
  });
  it("throws on an org install with no team id", () => {
    expect(() =>
      assertTeamIdForOrgToken(
        conn({ is_enterprise_install: true, enterprise: { id: "E1" } }),
        "",
        "users.list",
      ),
    ).toThrow(/organization level \(enterprise E1\)[\s\S]*users\.list/);
  });
});
describe("accountIsActiveFn", () => {
  beforeEach(() => {
    mockCreateClient.mockReset();
  });
  it("uses the commercial host for a commercial connection", async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: { ok: true } });
    mockCreateClient.mockReturnValue({ get: mockGet } as any);
    const result = await accountIsActiveFn(
      "xoxb-test",
      conn({}, "https://slack.com/api/oauth.v2.access"),
    );
    expect(result).toBe(true);
    expect(mockCreateClient).toHaveBeenCalledWith({
      baseUrl: "https://slack.com/api",
    });
  });
  it("uses the gov host for a gov connection", async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: { ok: true } });
    mockCreateClient.mockReturnValue({ get: mockGet } as any);
    const result = await accountIsActiveFn(
      "xoxb-gov-test",
      conn({}, "https://slack-gov.com/api/oauth.v2.access"),
    );
    expect(result).toBe(true);
    expect(mockCreateClient).toHaveBeenCalledWith({
      baseUrl: "https://slack-gov.com/api",
    });
  });
});
