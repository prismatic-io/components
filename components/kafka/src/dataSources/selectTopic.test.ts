import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { type Mock, vi } from "vitest";
import { awsAccessKeySecret } from "../connections/awsAccessKeySecret";
import { basic } from "../connections/basic";
import { selectTopicExamplePayload } from "../examplePayloads";
import { selectTopic } from "./selectTopic";
vi.mock("kafkajs", async () => ({
  ...(await vi.importActual<typeof import("kafkajs")>("kafkajs")),
  Kafka: vi.fn(),
}));
const mockedKafka = Kafka as unknown as Mock;
const adminMock = {
  connect: vi.fn(),
  listTopics: vi.fn(),
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
  brokers: ["broker-1.example.com:9092", "broker-2.example.com:9092"],
};
const iamConnection = createConnection(awsAccessKeySecret, {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtNFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  awsRegion: "us-east-1",
});
const topicNames = [
  ...selectTopicExamplePayload.result.map((element) => element.key),
  "__consumer_offsets",
  "__transaction_state",
];
beforeEach(() => {
  vi.clearAllMocks();
  adminMock.connect.mockResolvedValue(undefined);
  adminMock.disconnect.mockResolvedValue(undefined);
  adminMock.listTopics.mockResolvedValue(topicNames);
  // biome-ignore lint/complexity/useArrowFunction: must stay constructible, the mocked class is invoked with `new`
  mockedKafka.mockImplementation(function () {
    return { admin: () => adminMock };
  });
});
describe("selectTopic", () => {
  test("builds a TLS + OAUTHBEARER client for an Amazon MSK IAM connection", async () => {
    await invokeDataSource(selectTopic, {
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
  test("returns label/key elements with internal topics filtered out", async () => {
    const { result } = await invokeDataSource(selectTopic, params);
    expect(result).toEqual(selectTopicExamplePayload.result);
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
