import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { basic } from "../connections/basic";
import { getConsumerGroupStatusExamplePayload } from "../examplePayloads";
import { getConsumerGroupStatus } from "./getConsumerGroupStatus";
jest.mock("kafkajs", () => ({
  ...jest.requireActual("kafkajs"),
  Kafka: jest.fn(),
}));
const mockedKafka = Kafka as unknown as jest.Mock;
const adminMock = {
  connect: jest.fn(),
  describeGroups: jest.fn(),
  listTopics: jest.fn(),
  fetchOffsets: jest.fn(),
  fetchTopicOffsets: jest.fn(),
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
  consumerGroupId: "order-processing-group",
  topicsToCheck: ["order-events"],
};
const describeGroupsReply = {
  groups: [
    {
      groupId: "order-processing-group",
      state: "Stable",
      protocolType: "consumer",
      protocol: "RoundRobinAssigner",
      members: [
        {
          memberId: "order-processor-a2f4c8e1-7b3d-4e9a-b5c6-d8f0e1a2b3c4",
          clientId: "order-processor",
          clientHost: "/10.0.1.42",
          memberMetadata: Buffer.alloc(0),
          memberAssignment: Buffer.alloc(0),
        },
      ],
    },
  ],
};
const fetchOffsetsReply = [
  {
    topic: "order-events",
    partitions: [
      { partition: 0, offset: "1250", metadata: null },
      { partition: 1, offset: "980", metadata: null },
    ],
  },
];
const fetchTopicOffsetsReply = [
  { partition: 0, offset: "1255", high: "1255", low: "0" },
  { partition: 1, offset: "980", high: "980", low: "0" },
];
beforeEach(() => {
  jest.clearAllMocks();
  adminMock.connect.mockResolvedValue(undefined);
  adminMock.disconnect.mockResolvedValue(undefined);
  adminMock.describeGroups.mockResolvedValue(describeGroupsReply);
  adminMock.listTopics.mockResolvedValue(["order-events"]);
  adminMock.fetchOffsets.mockResolvedValue(fetchOffsetsReply);
  adminMock.fetchTopicOffsets.mockResolvedValue(fetchTopicOffsetsReply);
  mockedKafka.mockImplementation(() => ({ admin: () => adminMock }));
});
describe("getConsumerGroupStatus", () => {
  test("computes per-partition lag and the summed totals as strings", async () => {
    const { result } = await invoke(getConsumerGroupStatus, params);
    expect(result.data).toEqual(getConsumerGroupStatusExamplePayload.data);
    const [topicLag] = result.data.topicsWithOffsets;
    expect(topicLag.partitions).toEqual([
      {
        partition: 0,
        committedOffset: "1250",
        currentOffset: "1255",
        lag: "5",
      },
      { partition: 1, committedOffset: "980", currentOffset: "980", lag: "0" },
    ]);
    expect(topicLag.totalLag).toBe("5");
    expect(result.data.totalLag).toBe("5");
    expect(typeof result.data.totalLag).toBe("string");
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
  });
  test("uses topicsToCheck verbatim and requests offsets with resolveOffsets enabled", async () => {
    await invoke(getConsumerGroupStatus, params);
    expect(adminMock.fetchOffsets).toHaveBeenCalledWith({
      groupId: "order-processing-group",
      topics: ["order-events"],
      resolveOffsets: true,
    });
    expect(adminMock.listTopics).not.toHaveBeenCalled();
  });
  test("rethrows a describeGroups failure after swallowing the disconnect", async () => {
    adminMock.describeGroups.mockRejectedValue(
      new Error("The group coordinator is not available"),
    );
    await expect(invoke(getConsumerGroupStatus, params)).rejects.toThrow(
      "The group coordinator is not available",
    );
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
    expect(adminMock.fetchOffsets).not.toHaveBeenCalled();
  });
  test("examplePerform restamps the example payload with the supplied group id", async () => {
    const { examplePerform } = getConsumerGroupStatus;
    if (!examplePerform) {
      throw new Error("getConsumerGroupStatus has no examplePerform.");
    }
    const result = await examplePerform(undefined as never, {
      ...params,
      consumerGroupId: "some-other-group",
    });
    expect(result.data).toEqual({
      ...getConsumerGroupStatusExamplePayload.data,
      groupId: "some-other-group",
    });
    expect(mockedKafka).not.toHaveBeenCalled();
  });
});
