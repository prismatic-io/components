import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { type Mock, vi } from "vitest";
import { awsAccessKeySecret } from "../../connections/awsAccessKeySecret";
import { basic } from "../../connections/basic";
import { publishMessagesExamplePayload } from "../../examplePayloads";
import { publishMessages } from "./publishMessages";
vi.mock("kafkajs", async () => ({
  ...(await vi.importActual<typeof import("kafkajs")>("kafkajs")),
  Kafka: vi.fn(),
}));
const mockedKafka = Kafka as unknown as Mock;
const producerMock = {
  connect: vi.fn(),
  send: vi.fn(),
  disconnect: vi.fn(),
};
const connection = createConnection(basic, {
  username: "user",
  password: "pass",
  authMechanism: "plain",
});
const params = {
  connection,
  clientId: "my-app",
  brokers: ["broker-1.example.com:9092"],
  topic: "order-events",
  messages: [
    { key: "ignored-key-1", value: "first message" },
    { key: "ignored-key-2", value: "second message" },
  ],
};
const iamConnection = createConnection(awsAccessKeySecret, {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtNFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  awsRegion: "us-east-1",
});
beforeEach(() => {
  vi.clearAllMocks();
  producerMock.connect.mockResolvedValue(undefined);
  producerMock.disconnect.mockResolvedValue(undefined);
  // biome-ignore lint/complexity/useArrowFunction: must stay constructible, the mocked class is invoked with `new`
  mockedKafka.mockImplementation(function () {
    return { producer: () => producerMock };
  });
});
describe("publishMessages", () => {
  test("builds a TLS + OAUTHBEARER client for an Amazon MSK IAM connection", async () => {
    producerMock.send.mockResolvedValue(publishMessagesExamplePayload.data);
    await invoke(publishMessages, {
      ...params,
      connection: iamConnection,
      brokers: ["b-1.cluster.kafka.us-east-1.amazonaws.com:9098"],
    });
    expect(mockedKafka).toHaveBeenCalledWith(
      expect.objectContaining({
        ssl: true,
        sasl: expect.objectContaining({ mechanism: "oauthbearer" }),
      }),
    );
  });
  test("connects, sends, disconnects, and returns the producer record metadata", async () => {
    producerMock.send.mockResolvedValue(publishMessagesExamplePayload.data);
    const { result } = await invoke(publishMessages, params);
    expect(result.data).toEqual(publishMessagesExamplePayload.data);
    expect(producerMock.connect).toHaveBeenCalledTimes(1);
    expect(producerMock.send).toHaveBeenCalledTimes(1);
    expect(producerMock.disconnect).toHaveBeenCalledTimes(1);
    const [connectOrder] = producerMock.connect.mock.invocationCallOrder;
    const [sendOrder] = producerMock.send.mock.invocationCallOrder;
    const [disconnectOrder] = producerMock.disconnect.mock.invocationCallOrder;
    expect(connectOrder).toBeLessThan(sendOrder);
    expect(sendOrder).toBeLessThan(disconnectOrder);
  });
  test("maps each message to a value-only record, dropping the key", async () => {
    producerMock.send.mockResolvedValue(publishMessagesExamplePayload.data);
    await invoke(publishMessages, params);
    expect(producerMock.send).toHaveBeenCalledWith({
      topic: "order-events",
      messages: [{ value: "first message" }, { value: "second message" }],
    });
  });
  test("disconnects the producer and rethrows when producer.send fails", async () => {
    producerMock.send.mockRejectedValue(new Error("Broker not available"));
    await expect(invoke(publishMessages, params)).rejects.toThrow(
      "Broker not available",
    );
    expect(producerMock.connect).toHaveBeenCalledTimes(1);
    expect(producerMock.disconnect).toHaveBeenCalledTimes(1);
  });
  test("rethrows the send failure even when disconnect also fails", async () => {
    producerMock.send.mockRejectedValue(new Error("Broker not available"));
    producerMock.disconnect.mockRejectedValue(new Error("Socket closed"));
    await expect(invoke(publishMessages, params)).rejects.toThrow(
      "Broker not available",
    );
  });
  test("examplePerform restamps the example records with the supplied topic", async () => {
    const { examplePerform } = publishMessages;
    if (!examplePerform) {
      throw new Error("publishMessages has no examplePerform.");
    }
    const result = await examplePerform(undefined as never, params);
    expect(result.data).toEqual(
      publishMessagesExamplePayload.data.map((record) => ({
        ...record,
        topicName: "order-events",
      })),
    );
    expect(mockedKafka).not.toHaveBeenCalled();
  });
});
