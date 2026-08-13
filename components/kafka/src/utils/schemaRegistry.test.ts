import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { basic } from "../connections/basic";
import {
  createSchemaRegistryClient,
  deserializeBuffer,
} from "./schemaRegistry";
jest.mock("@kafkajs/confluent-schema-registry", () => ({
  SchemaRegistry: jest.fn(),
}));
const mockedSchemaRegistry = SchemaRegistry as unknown as jest.Mock;
beforeEach(() => {
  jest.clearAllMocks();
});
describe("createSchemaRegistryClient", () => {
  test("uses schemaRegistryUrl as the host and omits auth when no API key is set", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "plain",
      avroEnabled: true,
      schemaRegistryUrl: "https://psrc-example.us-east-1.confluent.cloud",
    });
    createSchemaRegistryClient(connection);
    expect(mockedSchemaRegistry).toHaveBeenCalledTimes(1);
    expect(mockedSchemaRegistry).toHaveBeenCalledWith({
      host: "https://psrc-example.us-east-1.confluent.cloud",
      auth: undefined,
    });
  });
  test("includes auth when schemaRegistryApiKey is set", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "plain",
      avroEnabled: true,
      schemaRegistryUrl: "https://psrc-example.us-east-1.confluent.cloud",
      schemaRegistryApiKey: "sr-key",
      schemaRegistryApiSecret: "sr-secret",
    });
    createSchemaRegistryClient(connection);
    expect(mockedSchemaRegistry).toHaveBeenCalledWith({
      host: "https://psrc-example.us-east-1.confluent.cloud",
      auth: { username: "sr-key", password: "sr-secret" },
    });
  });
  test("does not perform any I/O at construction time", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "plain",
      schemaRegistryUrl: "https://psrc-example.us-east-1.confluent.cloud",
    });
    expect(() => createSchemaRegistryClient(connection)).not.toThrow();
  });
});
describe("deserializeBuffer", () => {
  const stubRegistry = (decode: jest.Mock): SchemaRegistry =>
    ({ decode }) as unknown as SchemaRegistry;
  test("returns the decoded record on success", async () => {
    const decoded = { orderId: "order-12345", amount: 99.99 };
    const decode = jest.fn().mockResolvedValue(decoded);
    const logger = { warn: jest.fn() };
    const buffer = Buffer.from("avro-encoded-bytes");
    const result = await deserializeBuffer(
      stubRegistry(decode),
      buffer,
      logger,
    );
    expect(decode).toHaveBeenCalledWith(buffer);
    expect(result).toEqual(decoded);
    expect(logger.warn).not.toHaveBeenCalled();
  });
  test("does not throw on decode failure: warns and falls back to the raw string", async () => {
    const decode = jest.fn().mockRejectedValue(new Error("bad magic byte"));
    const logger = { warn: jest.fn() };
    const buffer = Buffer.from("not-really-avro");
    const result = await deserializeBuffer(
      stubRegistry(decode),
      buffer,
      logger,
    );
    expect(result).toBe("not-really-avro");
    expect(logger.warn).toHaveBeenCalledWith(
      "Avro deserialization failed, falling back to string: bad magic byte",
    );
  });
  test("labels a non-Error rejection as an unknown decode error", async () => {
    const decode = jest.fn().mockRejectedValue("a bare string rejection");
    const logger = { warn: jest.fn() };
    const result = await deserializeBuffer(
      stubRegistry(decode),
      Buffer.from("payload"),
      logger,
    );
    expect(result).toBe("payload");
    expect(logger.warn).toHaveBeenCalledWith(
      "Avro deserialization failed, falling back to string: Unknown decode error",
    );
  });
});
