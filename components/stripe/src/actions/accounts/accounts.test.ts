import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import { listAccountsExamplePayload } from "../../examplePayloads/accounts";
import { listAccounts } from "./listAccounts";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
afterEach(() => nock.cleanAll());
describe("listAccounts", () => {
  it("returns the connected accounts list", async () => {
    const scope = nock(BASE)
      .get("/v1/accounts")
      .query({ limit: "10" })
      .reply(200, listAccountsExamplePayload.data);
    const { result } = await invoke(
      listAccounts,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listAccountsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/accounts")
      .query(true)
      .reply(401, {
        error: {
          type: "invalid_request_error",
          message: "Invalid API Key provided",
        },
      });
    await expect(
      invoke(listAccounts, params({ pagination: {}, stripeConnection: conn })),
    ).rejects.toThrow("Invalid API Key provided");
  });
});
