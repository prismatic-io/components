import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { basic } from "../connections/basic";
import type { KafkaMessage } from "../types/consumer";
import { kafkaConsumer } from "./kafkaConsumer";
jest.mock("kafkajs", () => ({
  ...jest.requireActual("kafkajs"),
  Kafka: jest.fn(),
}));
jest.mock("@kafkajs/confluent-schema-registry", () => ({
  SchemaRegistry: jest.fn(),
}));
const mockedKafka = Kafka as unknown as jest.Mock;
const mockedSchemaRegistry = SchemaRegistry as unknown as jest.Mock;
interface EachMessagePayload {
  topic: string;
  partition: number;
  message: {
    key: Buffer | null;
    value: Buffer | null;
    offset: string;
    timestamp: string;
    headers?: Record<string, unknown>;
  };
}
const consumerMock = {
  connect: jest.fn(),
  subscribe: jest.fn(),
  run: jest.fn(),
  stop: jest.fn(),
  disconnect: jest.fn(),
};
const consumerFactory = jest.fn(() => consumerMock);
let feed: EachMessagePayload[] = [];
let runComplete: Promise<void> = Promise.resolve();
let eachMessageCallCount = 0;
const buildMessage = (
  offset: string,
  key: string,
  value: unknown,
): EachMessagePayload => ({
  topic: "order-events",
  partition: 0,
  message: {
    key: Buffer.from(key),
    value: Buffer.from(
      typeof value === "string" ? value : JSON.stringify(value),
    ),
    offset,
    timestamp: `172028160${offset.slice(-1)}000`,
    headers: {},
  },
});
const buildParams = (overrides: Record<string, unknown> = {}) => ({
  connection: createConnection(basic, {
    username: "user",
    password: "pass",
    authMechanism: "plain",
  }),
  clientId: "my-app",
  brokers: ["broker-1.example.com:9092"],
  consumerGroupId: "order-processing-group",
  topics: ["order-events"],
  maxMessages: 2,
  sessionTiming: { sessionTimeout: 30000, heartbeatInterval: 3000 },
  fromBeginning: false,
  autoCommit: true,
  deserializeKeys: false,
  ...overrides,
});
const messagesFrom = (result: {
  payload: {
    body: {
      data: unknown;
    };
  };
}) =>
  (
    result.payload.body.data as {
      messages: KafkaMessage[];
    }
  ).messages;
beforeEach(() => {
  jest.useFakeTimers({ doNotFake: ["nextTick", "queueMicrotask"] });
  jest.clearAllMocks();
  feed = [];
  eachMessageCallCount = 0;
  runComplete = Promise.resolve();
  consumerMock.connect.mockResolvedValue(undefined);
  consumerMock.subscribe.mockResolvedValue(undefined);
  consumerMock.stop.mockResolvedValue(undefined);
  consumerMock.disconnect.mockResolvedValue(undefined);
  consumerMock.run.mockImplementation(
    (config: {
      eachMessage: (payload: EachMessagePayload) => Promise<void>;
    }) => {
      runComplete = (async () => {
        for (const item of feed) {
          eachMessageCallCount += 1;
          await config.eachMessage(item);
        }
      })();
      return runComplete;
    },
  );
  consumerFactory.mockReturnValue(consumerMock);
  mockedKafka.mockImplementation(() => ({ consumer: consumerFactory }));
});
afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});
describe("kafkaConsumer", () => {
  test("maps each consumed message and wraps the batch into the trigger payload", async () => {
    feed = [
      buildMessage("142", "order-12345", { orderId: "order-12345" }),
      buildMessage("143", "order-12346", { orderId: "order-12346" }),
    ];
    const { result } = await invokeTrigger(
      kafkaConsumer,
      undefined,
      undefined,
      buildParams({ maxMessages: 2 }),
    );
    await runComplete;
    expect(messagesFrom(result)).toEqual([
      {
        topic: "order-events",
        partition: 0,
        offset: "142",
        key: "order-12345",
        value: JSON.stringify({ orderId: "order-12345" }),
        timestamp: "1720281602000",
        headers: {},
      },
      {
        topic: "order-events",
        partition: 0,
        offset: "143",
        key: "order-12346",
        value: JSON.stringify({ orderId: "order-12346" }),
        timestamp: "1720281603000",
        headers: {},
      },
    ]);
    expect(result.payload.body.data).toEqual({
      messages: messagesFrom(result),
      messageCount: 2,
      consumerGroupId: "order-processing-group",
      topics: ["order-events"],
    });
    expect(result.payload.executionId).toBe("executionId");
    expect(result.payload.invokeUrl).toBe("https://example.com");
    expect(consumerMock.stop).toHaveBeenCalledTimes(1);
    expect(consumerMock.disconnect).toHaveBeenCalledTimes(1);
  });
  test("returns early once maxMessages is reached without pushing further messages", async () => {
    feed = [
      buildMessage("142", "order-12345", { orderId: "order-12345" }),
      buildMessage("143", "order-12346", { orderId: "order-12346" }),
    ];
    const { result } = await invokeTrigger(
      kafkaConsumer,
      undefined,
      undefined,
      buildParams({ maxMessages: 1 }),
    );
    await runComplete;
    expect(eachMessageCallCount).toBe(2);
    expect(messagesFrom(result)).toHaveLength(1);
    expect(messagesFrom(result)[0].offset).toBe("142");
    expect(
      (
        result.payload.body.data as {
          messageCount: number;
        }
      ).messageCount,
    ).toBe(1);
  });
  test("subscribes once per topic and unwraps sessionTiming onto the consumer config", async () => {
    feed = [buildMessage("142", "order-12345", { orderId: "order-12345" })];
    await invokeTrigger(
      kafkaConsumer,
      undefined,
      undefined,
      buildParams({
        maxMessages: 1,
        topics: ["order-events", "user-activity"],
        fromBeginning: true,
      }),
    );
    await runComplete;
    expect(consumerFactory).toHaveBeenCalledWith({
      groupId: "order-processing-group",
      sessionTimeout: 30000,
      heartbeatInterval: 3000,
    });
    expect(consumerMock.subscribe).toHaveBeenCalledTimes(2);
    expect(consumerMock.subscribe).toHaveBeenCalledWith({
      topic: "order-events",
      fromBeginning: true,
    });
    expect(consumerMock.subscribe).toHaveBeenCalledWith({
      topic: "user-activity",
      fromBeginning: true,
    });
    expect(consumerMock.run).toHaveBeenCalledWith(
      expect.objectContaining({ autoCommit: true }),
    );
  });
  test("routes values through the schema registry when Avro is enabled, leaving keys as strings", async () => {
    const decoded = { orderId: "order-12345", amount: 99.99 };
    const decode = jest.fn().mockResolvedValue(decoded);
    mockedSchemaRegistry.mockImplementation(() => ({ decode }));
    feed = [buildMessage("142", "order-12345", "raw-avro-bytes")];
    const { result } = await invokeTrigger(
      kafkaConsumer,
      undefined,
      undefined,
      buildParams({
        maxMessages: 1,
        deserializeKeys: false,
        connection: createConnection(basic, {
          username: "user",
          password: "pass",
          authMechanism: "plain",
          avroEnabled: true,
          schemaRegistryUrl: "https://psrc-example.us-east-1.confluent.cloud",
        }),
      }),
    );
    await runComplete;
    expect(mockedSchemaRegistry).toHaveBeenCalledTimes(1);
    expect(decode).toHaveBeenCalledTimes(1);
    const [message] = messagesFrom(result);
    expect(message.value).toEqual(decoded);
    expect(message.key).toBe("order-12345");
  });
  test("rethrows a connect failure after swallowing the disconnect", async () => {
    consumerMock.connect.mockRejectedValue(
      new Error("Connection error: Broker not available"),
    );
    await expect(
      invokeTrigger(kafkaConsumer, undefined, undefined, buildParams()),
    ).rejects.toThrow("Connection error: Broker not available");
    expect(consumerMock.disconnect).toHaveBeenCalledTimes(1);
    expect(consumerMock.subscribe).not.toHaveBeenCalled();
    expect(consumerMock.run).not.toHaveBeenCalled();
  });
});
