import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { Kafka, logLevel as kafkaLogLevel } from "kafkajs";
import { createClient, getPayload } from "./client";
import { basic } from "./connections/basic";
jest.mock("kafkajs", () => ({
  ...jest.requireActual("kafkajs"),
  Kafka: jest.fn(),
}));
const mockedKafka = Kafka as unknown as jest.Mock;
beforeEach(() => {
  jest.clearAllMocks();
});
describe("getPayload", () => {
  test("passes clientId and brokers straight through when no connection is supplied", () => {
    expect(
      getPayload({
        clientId: "my-app",
        brokers: ["broker-1.example.com:9092"],
        connection: undefined,
      }),
    ).toEqual({
      clientId: "my-app",
      brokers: ["broker-1.example.com:9092"],
    });
  });
  test("throws a ConnectionError for a connection whose key is not the basic connection", () => {
    const foreign = {
      ...createConnection(basic, {
        username: "user",
        password: "pass",
        authMechanism: "plain",
      }),
      key: "oauth2",
    };
    expect(() =>
      getPayload({
        clientId: "my-app",
        brokers: ["broker-1.example.com:9092"],
        connection: foreign,
      }),
    ).toThrow(ConnectionError);
  });
  test("throws a ConnectionError for an unsupported authMechanism", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "gssapi",
    });
    expect(() =>
      getPayload({
        clientId: "my-app",
        brokers: ["broker-1.example.com:9092"],
        connection,
      }),
    ).toThrow("Invalid Authentication Mechanism specified: 'gssapi'.");
  });
  test("wires SSL certificates and normalizes their literal line breaks", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "scram-sha-512",
      sslEnabled: true,
      caCert:
        "-----BEGIN CERTIFICATE-----\\nCA-BODY\\n-----END CERTIFICATE-----",
    });
    const config = getPayload({
      clientId: "my-app",
      brokers: ["broker-1.example.com:9092"],
      connection,
    });
    expect(config.ssl).toEqual({
      ca: "-----BEGIN CERTIFICATE-----\nCA-BODY\n-----END CERTIFICATE-----",
    });
    expect(config.sasl).toEqual({
      mechanism: "scram-sha-512",
      username: "user",
      password: "pass",
    });
  });
  test("omits the ssl block entirely when sslEnabled is false", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "plain",
      sslEnabled: false,
      caCert:
        "-----BEGIN CERTIFICATE-----\\nCA-BODY\\n-----END CERTIFICATE-----",
    });
    const config = getPayload({
      clientId: "my-app",
      brokers: ["broker-1.example.com:9092"],
      connection,
    });
    expect(config.ssl).toBeUndefined();
  });
  test("skips SASL entirely when client certificates are present", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "plain",
      sslEnabled: true,
      caCert: "CA\\nBODY",
      clientCert: "CERT\\nBODY",
      clientKey: "KEY\\nBODY",
    });
    const config = getPayload({
      clientId: "my-app",
      brokers: ["broker-1.example.com:9092"],
      connection,
    });
    expect(config.ssl).toEqual({
      ca: "CA\nBODY",
      cert: "CERT\nBODY",
      key: "KEY\nBODY",
    });
    expect(config.sasl).toBeUndefined();
  });
  test("trims whitespace off the SASL username and password", () => {
    const connection = createConnection(basic, {
      username: "  user  ",
      password: "  pass  ",
      authMechanism: "scram-sha-256",
    });
    const config = getPayload({
      clientId: "my-app",
      brokers: ["broker-1.example.com:9092"],
      connection,
    });
    expect(config.sasl).toEqual({
      mechanism: "scram-sha-256",
      username: "user",
      password: "pass",
    });
  });
});
describe("createClient", () => {
  test("sets logLevel DEBUG on the Kafka config when debug is enabled", () => {
    createClient(
      {
        clientId: "my-app",
        brokers: ["broker-1.example.com:9092"],
        connection: undefined,
      },
      true,
    );
    expect(mockedKafka).toHaveBeenCalledWith({
      clientId: "my-app",
      brokers: ["broker-1.example.com:9092"],
      logLevel: kafkaLogLevel.DEBUG,
    });
  });
  test("leaves logLevel unset when debug is disabled", () => {
    createClient(
      {
        clientId: "my-app",
        brokers: ["broker-1.example.com:9092"],
        connection: undefined,
      },
      false,
    );
    expect(mockedKafka).toHaveBeenCalledWith({
      clientId: "my-app",
      brokers: ["broker-1.example.com:9092"],
    });
  });
});
