import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { Kafka } from "kafkajs";
import { type Mock, vi } from "vitest";
import { awsAccessKeySecret } from "../../connections/awsAccessKeySecret";
import { basic } from "../../connections/basic";
import { getConsumerGroupStatusExamplePayload } from "../../examplePayloads";
import { getConsumerGroupStatus } from "./getConsumerGroupStatus";
vi.mock("kafkajs", async () => ({
  ...(await vi.importActual<typeof import("kafkajs")>("kafkajs")),
  Kafka: vi.fn(),
}));
const mockedKafka = Kafka as unknown as Mock;
const adminMock = {
  connect: vi.fn(),
  describeGroups: vi.fn(),
  listTopics: vi.fn(),
  fetchOffsets: vi.fn(),
  fetchTopicOffsets: vi.fn(),
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
  consumerGroupId: "order-processing-group",
  topicsToCheck: ["order-events"],
};
const iamConnection = createConnection(awsAccessKeySecret, {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtNFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  awsRegion: "us-east-1",
});
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
  vi.clearAllMocks();
  adminMock.connect.mockResolvedValue(undefined);
  adminMock.disconnect.mockResolvedValue(undefined);
  adminMock.describeGroups.mockResolvedValue(describeGroupsReply);
  adminMock.listTopics.mockResolvedValue(["order-events"]);
  adminMock.fetchOffsets.mockResolvedValue(fetchOffsetsReply);
  adminMock.fetchTopicOffsets.mockResolvedValue(fetchTopicOffsetsReply);
  // biome-ignore lint/complexity/useArrowFunction: must stay constructible, the mocked class is invoked with `new`
  mockedKafka.mockImplementation(function () {
    return { admin: () => adminMock };
  });
});
describe("getConsumerGroupStatus", () => {
  test("builds a TLS + OAUTHBEARER client for an Amazon MSK IAM connection", async () => {
    await invoke(getConsumerGroupStatus, {
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
