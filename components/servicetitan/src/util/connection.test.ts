import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { serviceTitanConnection } from "../connections";
import { connection, TENANT } from "../testHelpers";
import {
  getApplicationKeyFromConnection,
  getTokenFromConnection,
  getURLFromConnection,
  validateConnection,
} from "./connection";
const APPLICATION_KEY = "ak1.testapplicationkey";
const ACCESS_TOKEN = "test-access-token";
const buildConnection = (fields: Record<string, unknown>): Connection =>
  createConnection(
    serviceTitanConnection,
    { tenant: TENANT, applicationKey: APPLICATION_KEY, ...fields },
    { access_token: ACCESS_TOKEN },
  ) as unknown as Connection;
describe("validateConnection", () => {
  test("accepts the ServiceTitan connection", () => {
    expect(() => validateConnection(connection)).not.toThrow();
  });
  test("throws a ConnectionError naming the received key for any other connection", () => {
    const wrongConnection = {
      ...connection,
      key: "someOtherConnection",
    } as Connection;
    expect(() => validateConnection(wrongConnection)).toThrow(ConnectionError);
    expect(() => validateConnection(wrongConnection)).toThrow(
      'Expected the serviceTitanConnection connection but received "someOtherConnection".',
    );
  });
});
describe("getURLFromConnection", () => {
  test("defaults to the production host when the connection omits environment", () => {
    expect(getURLFromConnection(connection, "jpm")).toBe(
      `https://api.servicetitan.io/jpm/v2/tenant/${TENANT}`,
    );
  });
  test("uses the integration host when the connection selects it", () => {
    expect(
      getURLFromConnection(
        buildConnection({ environment: "integration" }),
        "crm",
      ),
    ).toBe(`https://api-integration.servicetitan.io/crm/v2/tenant/${TENANT}`);
  });
  test("throws when no URL type is supplied", () => {
    expect(() => getURLFromConnection(connection, undefined)).toThrow(
      "URL type is required",
    );
    expect(() => getURLFromConnection(connection, "")).toThrow(
      "URL type is required",
    );
  });
});
describe("getTokenFromConnection and getApplicationKeyFromConnection", () => {
  test("read the bearer token and application key the client sends as headers", () => {
    expect(getTokenFromConnection(connection)).toBe(ACCESS_TOKEN);
    expect(getApplicationKeyFromConnection(connection)).toBe(APPLICATION_KEY);
  });
});
