import { gql } from "graphql-request";
import nock from "nock";
import { createFluentClient } from "./client";
import {
  expectDebugLoggedRequest,
  mockGraphql,
  mockTokenExchange,
  recordingLogger,
  TEST_HOST,
  testConnection,
  useNockLifecycle,
} from "./testHelpers";
const meQuery = gql`
  query Me($id: ID) {
    me(id: $id) {
      id
    }
  }
`;
describe("createFluentClient", () => {
  useNockLifecycle();
  it("rejects a connection of an unexpected type before any request", async () => {
    await expect(
      createFluentClient({ ...testConnection, key: "other-connection" }),
    ).rejects.toThrow("Received unexpected connection type: other-connection");
  });
  it("rejects a token response that carries no access_token", async () => {
    nock(TEST_HOST)
      .post("/oauth/token")
      .query(true)
      .reply(200, { token_type: "bearer" });
    await expect(createFluentClient(testConnection)).rejects.toThrow(
      "Fluent returned no access token. Please ensure your username, password, client ID, client secret and endpoint URL are correct.",
    );
    expect(nock.isDone()).toBe(true);
  });
  it("logs each GraphQL operation and its variables in Debug Mode, never the headers", async () => {
    mockTokenExchange();
    mockGraphql(200, { data: { me: { id: "1" } } });
    const logger = recordingLogger();
    const client = await createFluentClient(testConnection, true, logger);
    await client.request(meQuery, { id: "1" });
    expect(logger.debug).toHaveBeenCalledTimes(1);
    expectDebugLoggedRequest(logger, ["query Me", '"id":"1"']);
    expect(vi.mocked(logger.debug).mock.calls.flat().join("\n")).not.toMatch(
      /bearer/i,
    );
    expect(nock.isDone()).toBe(true);
  });
  it("logs nothing when Debug Mode is off", async () => {
    mockTokenExchange();
    mockGraphql(200, { data: { me: { id: "1" } } });
    const logger = recordingLogger();
    const client = await createFluentClient(testConnection, false, logger);
    await client.request(meQuery, { id: "1" });
    for (const channel of Object.values(logger)) {
      expect(channel).not.toHaveBeenCalled();
    }
    expect(nock.isDone()).toBe(true);
  });
});
