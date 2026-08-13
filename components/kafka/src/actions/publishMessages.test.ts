import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { basic } from "../connections/basic";
import { publishMessagesExamplePayload } from "../examplePayloads";
import { publishMessages } from "./publishMessages";
jest.mock("kafkajs", () => ({
  ...jest.requireActual("kafkajs"),
  Kafka: jest.fn(),
}));
const mockedKafka = Kafka as unknown as jest.Mock;
const producerMock = {
  connect: jest.fn(),
  send: jest.fn(),
  disconnect: jest.fn(),
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
beforeEach(() => {
  jest.clearAllMocks();
  producerMock.connect.mockResolvedValue(undefined);
  producerMock.disconnect.mockResolvedValue(undefined);
  mockedKafka.mockImplementation(() => ({ producer: () => producerMock }));
});
describe("publishMessages", () => {
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
  test("propagates a producer.send failure and leaks the producer connection", async () => {
    producerMock.send.mockRejectedValue(new Error("Broker not available"));
    await expect(invoke(publishMessages, params)).rejects.toThrow(
      "Broker not available",
    );
    expect(producerMock.connect).toHaveBeenCalledTimes(1);
    expect(producerMock.disconnect).not.toHaveBeenCalled();
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
