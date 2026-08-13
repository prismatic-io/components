import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { basic } from "../connections/basic";
import { listTopicsExamplePayload } from "../examplePayloads";
import { listTopics } from "./listTopics";
jest.mock("kafkajs", () => ({
  ...jest.requireActual("kafkajs"),
  Kafka: jest.fn(),
}));
const mockedKafka = Kafka as unknown as jest.Mock;
const adminMock = {
  connect: jest.fn(),
  listTopics: jest.fn(),
  fetchTopicMetadata: jest.fn(),
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
};
const partitionsOfLength = (count: number) =>
  Array.from({ length: count }, (_unused, partitionId) => ({
    partitionId,
    leader: 0,
    replicas: [0],
    isr: [0],
  }));
const topicNames = ["order-events", "user-activity", "__consumer_offsets"];
const topicMetadata = {
  topics: [
    { name: "order-events", partitions: partitionsOfLength(3) },
    { name: "user-activity", partitions: partitionsOfLength(6) },
    { name: "__consumer_offsets", partitions: partitionsOfLength(50) },
  ],
};
beforeEach(() => {
  jest.clearAllMocks();
  adminMock.connect.mockResolvedValue(undefined);
  adminMock.disconnect.mockResolvedValue(undefined);
  adminMock.listTopics.mockResolvedValue(topicNames);
  adminMock.fetchTopicMetadata.mockResolvedValue(topicMetadata);
  mockedKafka.mockImplementation(() => ({ admin: () => adminMock }));
});
describe("listTopics", () => {
  test("splits topics from internal topics on the __ prefix", async () => {
    const { result } = await invoke(listTopics, params);
    expect(result.data.topics).toEqual([
      { name: "order-events", partitions: 3, isInternal: false },
      { name: "user-activity", partitions: 6, isInternal: false },
    ]);
    expect(result.data.internalTopics).toEqual([
      { name: "__consumer_offsets", partitions: 50, isInternal: true },
    ]);
    expect(result.data).toEqual(listTopicsExamplePayload.data);
    expect(adminMock.fetchTopicMetadata).toHaveBeenCalledWith({
      topics: topicNames,
    });
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
  });
  test("counts both topics and internalTopics in totalCount", async () => {
    const { result } = await invoke(listTopics, params);
    expect(result.data.topics).toHaveLength(2);
    expect(result.data.internalTopics).toHaveLength(1);
    expect(result.data.totalCount).toBe(3);
  });
  test("rethrows a connect failure after swallowing the disconnect", async () => {
    adminMock.connect.mockRejectedValue(new Error("Connection timeout"));
    await expect(invoke(listTopics, params)).rejects.toThrow(
      "Connection timeout",
    );
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
    expect(adminMock.listTopics).not.toHaveBeenCalled();
  });
  test("examplePerform returns the example payload without touching the broker", async () => {
    const { examplePerform } = listTopics;
    if (!examplePerform) {
      throw new Error("listTopics has no examplePerform.");
    }
    const result = await examplePerform(undefined as never, params);
    expect(result).toEqual(listTopicsExamplePayload);
    expect(mockedKafka).not.toHaveBeenCalled();
  });
});
