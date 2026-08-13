import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { basic } from "../connections/basic";
import { selectTopic } from "./selectTopic";
jest.mock("kafkajs", () => ({
  ...jest.requireActual("kafkajs"),
  Kafka: jest.fn(),
}));
const mockedKafka = Kafka as unknown as jest.Mock;
const adminMock = {
  connect: jest.fn(),
  listTopics: jest.fn(),
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
  brokers: ["broker-1.example.com:9092", "broker-2.example.com:9092"],
};
const topicNames = [
  "order-events",
  "user-activity",
  "__consumer_offsets",
  "__transaction_state",
];
beforeEach(() => {
  jest.clearAllMocks();
  adminMock.connect.mockResolvedValue(undefined);
  adminMock.disconnect.mockResolvedValue(undefined);
  adminMock.listTopics.mockResolvedValue(topicNames);
  mockedKafka.mockImplementation(() => ({ admin: () => adminMock }));
});
describe("selectTopic", () => {
  test("returns label/key elements with internal topics filtered out", async () => {
    const { result } = await invokeDataSource(selectTopic, params);
    expect(result).toEqual([
      { label: "order-events", key: "order-events" },
      { label: "user-activity", key: "user-activity" },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
    expect(mockedKafka).toHaveBeenCalledWith(
      expect.objectContaining({
        clientId: "my-app",
        brokers: ["broker-1.example.com:9092", "broker-2.example.com:9092"],
      }),
    );
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
  });
  test("returns an empty result when the cluster has no topics", async () => {
    adminMock.listTopics.mockResolvedValue([]);
    const { result } = await invokeDataSource(selectTopic, params);
    expect(result).toEqual([]);
  });
  test("returns an empty result when every topic is internal", async () => {
    adminMock.listTopics.mockResolvedValue([
      "__consumer_offsets",
      "__transaction_state",
    ]);
    const { result } = await invokeDataSource(selectTopic, params);
    expect(result).toEqual([]);
  });
  test("rethrows a connect failure after swallowing the disconnect", async () => {
    adminMock.connect.mockRejectedValue(new Error("Connection timeout"));
    await expect(invokeDataSource(selectTopic, params)).rejects.toThrow(
      "Connection timeout",
    );
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
    expect(adminMock.listTopics).not.toHaveBeenCalled();
  });
});
