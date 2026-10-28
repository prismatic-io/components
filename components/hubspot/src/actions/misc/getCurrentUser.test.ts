import type { MockedFunction } from "vitest";
import { getHubspotClient } from "../../client";
import { hubspotOAuth, privateAppAccessToken } from "../../connections";
import { getCurrentUser } from "./getCurrentUser";
vi.mock("../../client");
const mockedGetHubspotClient = getHubspotClient as MockedFunction<
  typeof getHubspotClient
>;
const details = {
  portalId: 123,
  timeZone: "US/Eastern",
  companyCurrency: "USD",
  utcOffset: "-05:00",
  utcOffsetMilliseconds: -18000000,
  accountType: "STANDARD",
};
const context = { debug: { enabled: false } } as never;
beforeEach(() => vi.clearAllMocks());
describe("getCurrentUser", () => {
  test("private app: reads dated account details and aliases currency", async () => {
    const get = vi.fn().mockResolvedValue({ data: details });
    mockedGetHubspotClient.mockReturnValue({ get } as never);
    const result = await getCurrentUser.perform(context, {
      hubspotConnection: { key: privateAppAccessToken.key, fields: {} },
      timeout: undefined,
    } as never);
    expect(get).toHaveBeenCalledWith("/account-info/2026-09/details");
    expect(result).toEqual({ data: { ...details, currency: "USD" } });
  });
  test("OAuth: introspects against the dated path and merges user_id and user", async () => {
    const get = vi.fn().mockResolvedValue({ data: details });
    const post = vi
      .fn()
      .mockResolvedValue({ data: { user_id: 7, user: "a@b.co" } });
    mockedGetHubspotClient.mockReturnValue({
      get,
      post,
      defaults: { headers: { Authorization: "Bearer tok" } },
    } as never);
    const result = await getCurrentUser.perform(context, {
      hubspotConnection: {
        key: hubspotOAuth.key,
        fields: { clientId: "id", clientSecret: "secret" },
      },
      timeout: undefined,
    } as never);
    expect(get).toHaveBeenCalledWith("/account-info/2026-09/details");
    expect(post).toHaveBeenCalledWith(
      "/oauth/2026-09/token/introspect",
      "client_id=id&client_secret=secret&token=tok",
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    expect(result).toEqual({
      data: { ...details, currency: "USD", user_id: 7, user: "a@b.co" },
    });
  });
});
