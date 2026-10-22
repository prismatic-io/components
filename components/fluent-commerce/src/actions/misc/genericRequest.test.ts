import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { genericRequestExamplePayload } from "../../examplePayloads";
import {
  debugModeContext,
  expectDebugLoggedRequest,
  mockGraphql,
  mockTokenExchange,
  recordingLogger,
  testConnection,
  useNockLifecycle,
} from "../../testHelpers";
import { genericRequest } from "./genericRequest";
const query =
  "query GetRetailer($retailerId: ID!) { retailer(id: $retailerId) { id } }";
describe("genericRequest", () => {
  useNockLifecycle();
  it("forwards the query and merges variablesObject over variables", async () => {
    mockTokenExchange();
    const graphql = mockGraphql(200, genericRequestExamplePayload);
    const { result } = await invoke(genericRequest, {
      connection: testConnection,
      query,
      variables: { retailerId: "1", ref: "ORDER-1" },
      variablesObject: { retailerId: 34, first: 10 },
    });
    expect(graphql.body()?.query).toBe(query);
    expect(graphql.body()?.variables).toEqual({
      retailerId: 34,
      ref: "ORDER-1",
      first: 10,
    });
    expect(result).toEqual({ data: genericRequestExamplePayload.data });
    expect(nock.isDone()).toBe(true);
  });
  it("sends variables unchanged when variablesObject is undefined", async () => {
    mockTokenExchange();
    const graphql = mockGraphql(200, genericRequestExamplePayload);
    await invoke(genericRequest, {
      connection: testConnection,
      query,
      variables: { retailerId: "34" },
      variablesObject: undefined,
    });
    expect(graphql.body()?.variables).toEqual({ retailerId: "34" });
    expect(nock.isDone()).toBe(true);
  });
  it("logs the GraphQL query and its variables in Debug Mode", async () => {
    mockTokenExchange();
    mockGraphql(200, genericRequestExamplePayload);
    const logger = recordingLogger();
    await invoke(
      genericRequest,
      {
        connection: testConnection,
        query,
        variables: { retailerId: "34" },
        variablesObject: undefined,
      },
      debugModeContext(logger),
    );
    expectDebugLoggedRequest(logger, ["GetRetailer", '"retailerId":"34"']);
    expect(nock.isDone()).toBe(true);
  });
  it("rejects when the GraphQL endpoint returns a 4xx", async () => {
    mockTokenExchange();
    mockGraphql(400, { errors: [{ message: "Syntax Error" }] });
    await expect(
      invoke(genericRequest, {
        connection: testConnection,
        query,
        variables: {},
        variablesObject: undefined,
      }),
    ).rejects.toThrow();
    expect(nock.isDone()).toBe(true);
  });
});
