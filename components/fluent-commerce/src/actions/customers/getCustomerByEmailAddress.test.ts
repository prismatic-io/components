import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getCustomerByEmailAddressExamplePayload } from "../../examplePayloads";
import {
  debugModeContext,
  expectDebugLoggedRequest,
  mockGraphql,
  mockTokenExchange,
  recordingLogger,
  testConnection,
  useNockLifecycle,
} from "../../testHelpers";
import { getCustomerByEmailAddress } from "./getCustomerByEmailAddress";

describe("getCustomerByEmailAddress", () => {
  useNockLifecycle();

  it("sends the email address as a GraphQL variable and returns the data", async () => {
    mockTokenExchange();
    const graphql = mockGraphql(200, getCustomerByEmailAddressExamplePayload);

    const { result } = await invoke(getCustomerByEmailAddress, {
      connection: testConnection,
      emailAddress: "jdoe@email.com",
    });

    expect(graphql.body()?.variables).toEqual({
      emailAddress: "jdoe@email.com",
    });
    expect(result).toEqual({
      data: getCustomerByEmailAddressExamplePayload.data,
    });
    expect(nock.isDone()).toBe(true);
  });

  it("logs the GraphQL query and its variables in Debug Mode", async () => {
    mockTokenExchange();
    mockGraphql(200, getCustomerByEmailAddressExamplePayload);
    const logger = recordingLogger();

    await invoke(
      getCustomerByEmailAddress,
      { connection: testConnection, emailAddress: "jdoe@email.com" },
      debugModeContext(logger),
    );

    expectDebugLoggedRequest(logger, ['"emailAddress":"jdoe@email.com"']);
    expect(nock.isDone()).toBe(true);
  });

  it("rejects when the GraphQL endpoint returns a 4xx", async () => {
    mockTokenExchange();
    mockGraphql(400, { errors: [{ message: "Bad request" }] });

    await expect(
      invoke(getCustomerByEmailAddress, {
        connection: testConnection,
        emailAddress: "jdoe@email.com",
      }),
    ).rejects.toThrow();
    expect(nock.isDone()).toBe(true);
  });
});
