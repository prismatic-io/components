import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import {
  CLIENT_CREDENTIALS_USER_ID,
  clientCredentialsConnection,
  delegatedConnection,
  GRAPH_HOST,
} from "../../testHelpers";

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("getCurrentUser", () => {
  test("returns the signed-in user for a delegated connection", async () => {
    const scope = nock(GRAPH_HOST).get("/v1.0/me").reply(200, getCurrentUserExamplePayload.data);

    const result = await harness.action("getCurrentUser", { connection: delegatedConnection() });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(getCurrentUserExamplePayload);
  });

  test("returns the configured user for a client-credentials connection", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/users/${CLIENT_CREDENTIALS_USER_ID}`)
      .reply(200, getCurrentUserExamplePayload.data);

    await harness.action("getCurrentUser", { connection: clientCredentialsConnection() });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST)
      .get("/v1.0/me")
      .reply(401, { error: { code: "InvalidAuthenticationToken", message: "Expired." } });

    await expect(
      harness.action("getCurrentUser", { connection: delegatedConnection() }),
    ).rejects.toThrow();
  });
});
