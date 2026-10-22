import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { fluentCommerceOAuthPassword } from "../../connections";
import { createCustomerExamplePayload } from "../../examplePayloads";
import {
  debugModeContext,
  expectDebugLoggedRequest,
  mockGraphql,
  mockTokenExchange,
  recordingLogger,
  TEST_HOST,
  testConnection,
  useNockLifecycle,
} from "../../testHelpers";
import customers from "./index";
const cleanAttributes = customers.createCustomer.inputs.attributes.clean;
describe("createCustomer attributes clean", () => {
  it("maps each key-value pair to a string attribute", () => {
    expect(
      cleanAttributes([
        { key: "loyaltyTier", value: "gold" },
        { key: "source", value: "web" },
      ]),
    ).toEqual([
      { name: "loyaltyTier", type: "STRING", value: "gold" },
      { name: "source", type: "STRING", value: "web" },
    ]);
  });
  it("returns an empty list when no attributes are configured", () => {
    expect(cleanAttributes(undefined)).toEqual([]);
  });
});
describe("createCustomer outgoing request", () => {
  const host = "https://example.api.fluentretail.com";
  const connection = createConnection(fluentCommerceOAuthPassword, {
    host,
    username: "john_doe",
    password: "secret",
    clientId: "client-id",
    clientSecret: "client-secret",
  });
  beforeAll(() => {
    nock.disableNetConnect();
  });
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.enableNetConnect();
  });
  it("sends the cleaned attributes as GraphQL variables", async () => {
    const attributes = cleanAttributes([{ key: "loyaltyTier", value: "Gold" }]);
    nock(host)
      .post("/oauth/token")
      .query(true)
      .reply(200, { access_token: "test-token" });
    let graphqlBody:
      | {
          variables?: Record<string, unknown>;
        }
      | undefined;
    nock(host)
      .post("/graphql", (body) => {
        graphqlBody = body;
        return true;
      })
      .reply(200, createCustomerExamplePayload);
    const { result } = await invoke(customers.createCustomer, {
      connection,
      retailerId: "34",
      customerEmail: "jdoe@email.com",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+123456789",
      country: "Australia",
      timezone: "Australia/Sydney",
      promotionOptIn: true,
      attributes,
    });
    expect(graphqlBody?.variables?.attributes).toEqual([
      { name: "loyaltyTier", type: "STRING", value: "Gold" },
    ]);
    expect(result).toEqual({ data: createCustomerExamplePayload.data });
    expect(nock.isDone()).toBe(true);
  });
});
describe("createCustomer optional timezone", () => {
  useNockLifecycle();
  it("declares timezone nullable and omits it when not configured", async () => {
    mockTokenExchange();
    const graphql = mockGraphql(200, createCustomerExamplePayload);
    await invoke(customers.createCustomer, {
      connection: testConnection,
      retailerId: "34",
      customerEmail: "jdoe@email.com",
      firstName: "John",
      lastName: undefined,
      phoneNumber: undefined,
      country: undefined,
      timezone: customers.createCustomer.inputs.timezone.clean(""),
      promotionOptIn: false,
      attributes: [],
    });
    expect(graphql.body()?.query).toMatch(/\$timezone: String\s/);
    expect(graphql.body()?.variables).not.toHaveProperty("timezone");
    expect(nock.isDone()).toBe(true);
  });
  it("logs the GraphQL mutation and its variables in Debug Mode", async () => {
    mockTokenExchange();
    mockGraphql(200, createCustomerExamplePayload);
    const logger = recordingLogger();
    await invoke(
      customers.createCustomer,
      {
        connection: testConnection,
        retailerId: "34",
        customerEmail: "jdoe@email.com",
        firstName: "John",
        lastName: undefined,
        phoneNumber: undefined,
        country: undefined,
        timezone: "",
        promotionOptIn: false,
        attributes: [],
      },
      debugModeContext(logger),
    );
    expectDebugLoggedRequest(logger, ['"customerEmail":"jdoe@email.com"']);
    expect(nock.isDone()).toBe(true);
  });
});
describe("createCustomer error path", () => {
  useNockLifecycle();
  it("rejects with the authentication error when the token exchange fails", async () => {
    nock(TEST_HOST)
      .post("/oauth/token")
      .query(true)
      .reply(401, { error: "invalid_grant" });
    await expect(
      invoke(customers.createCustomer, {
        connection: testConnection,
        retailerId: "34",
        customerEmail: "jdoe@email.com",
        firstName: "John",
        lastName: undefined,
        phoneNumber: undefined,
        country: undefined,
        timezone: "",
        promotionOptIn: false,
        attributes: [],
      }),
    ).rejects.toThrow("An error occurred during authentication");
    expect(nock.isDone()).toBe(true);
  });
});
