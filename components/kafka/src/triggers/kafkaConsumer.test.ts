import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { type Mock, vi } from "vitest";
import { awsAccessKeySecret } from "../connections/awsAccessKeySecret";
import { basic } from "../connections/basic";
import type { KafkaMessage } from "../types/consumer";
import { kafkaConsumer } from "./kafkaConsumer";
vi.mock("kafkajs", async () => ({
  ...(await vi.importActual<typeof import("kafkajs")>("kafkajs")),
  Kafka: vi.fn(),
}));
vi.mock("@kafkajs/confluent-schema-registry", () => ({
  SchemaRegistry: vi.fn(),
}));
const mockedKafka = Kafka as unknown as Mock;
const mockedSchemaRegistry = SchemaRegistry as unknown as Mock;
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
  connect: vi.fn(),
  subscribe: vi.fn(),
  run: vi.fn(),
  stop: vi.fn(),
  disconnect: vi.fn(),
};
const consumerFactory = vi.fn(() => consumerMock);
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
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
  consumerOptions: {
    fromBeginning: false,
    autoCommit: true,
    deserializeKeys: false,
  },
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
  vi.useFakeTimers({
    toFake: [
      "Date",
      "hrtime",
      "performance",
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "requestIdleCallback",
      "cancelIdleCallback",
      "setImmediate",
      "clearImmediate",
      "setInterval",
      "clearInterval",
      "setTimeout",
      "clearTimeout",
    ],
  });
  vi.clearAllMocks();
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
  // biome-ignore lint/complexity/useArrowFunction: must stay constructible, the mocked class is invoked with `new`
  mockedKafka.mockImplementation(function () {
    return { consumer: consumerFactory };
  });
});
afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});
describe("kafkaConsumer", () => {
  test("rethrows when the consumer fails to run instead of waiting out the idle cut-off", async () => {
    consumerMock.run.mockRejectedValueOnce(new Error("group join failed"));
    await expect(
      invokeTrigger(kafkaConsumer, undefined, undefined, buildParams()),
    ).rejects.toThrow("group join failed");
    expect(consumerMock.disconnect).toHaveBeenCalledTimes(1);
  });
  test("builds a TLS + OAUTHBEARER client for an Amazon MSK IAM connection", async () => {
    feed = [buildMessage("142", "order-12345", { orderId: "order-12345" })];
    await invokeTrigger(
      kafkaConsumer,
      undefined,
      undefined,
      buildParams({
        connection: createConnection(awsAccessKeySecret, {
          accessKeyId: "AKIAIOSFODNN7EXAMPLE",
          secretAccessKey: "wJalrXUtNFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
          awsRegion: "us-east-1",
        }),
        brokers: ["b-1.cluster.kafka.us-east-1.amazonaws.com:9098"],
        maxMessages: 1,
      }),
    );
    await runComplete;
    expect(mockedKafka).toHaveBeenCalledWith(
      expect.objectContaining({
        ssl: true,
        sasl: expect.objectContaining({ mechanism: "oauthbearer" }),
      }),
    );
  });
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
  test("subscribes once per topic and passes the session timing onto the consumer config", async () => {
    feed = [buildMessage("142", "order-12345", { orderId: "order-12345" })];
    await invokeTrigger(
      kafkaConsumer,
      undefined,
      undefined,
      buildParams({
        maxMessages: 1,
        topics: ["order-events", "user-activity"],
        consumerOptions: {
          fromBeginning: true,
          autoCommit: true,
          deserializeKeys: false,
        },
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
    const decode = vi.fn().mockResolvedValue(decoded);
    // biome-ignore lint/complexity/useArrowFunction: must stay constructible, the mocked class is invoked with `new`
    mockedSchemaRegistry.mockImplementation(function () {
      return { decode };
    });
    feed = [buildMessage("142", "order-12345", "raw-avro-bytes")];
    const { result } = await invokeTrigger(
      kafkaConsumer,
      undefined,
      undefined,
      buildParams({
        maxMessages: 1,
        consumerOptions: {
          fromBeginning: false,
          autoCommit: true,
          deserializeKeys: false,
        },
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
