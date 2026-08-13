const consumerGroupMemberSchema = {
  type: "object" as const,
  properties: {
    memberId: { type: "string" },
    clientId: { type: "string" },
    clientHost: { type: "string" },
  },
  required: ["memberId", "clientId", "clientHost"],
};
const partitionLagSchema = {
  type: "object" as const,
  properties: {
    partition: { type: "integer" },
    committedOffset: { type: "string" },
    currentOffset: { type: "string" },
    lag: { type: "string" },
  },
  required: ["partition", "committedOffset", "currentOffset", "lag"],
};
const topicLagSchema = {
  type: "object" as const,
  properties: {
    topic: { type: "string" },
    partitions: { type: "array", items: partitionLagSchema },
    totalLag: { type: "string" },
  },
  required: ["topic", "partitions", "totalLag"],
};
export const getConsumerGroupStatusOutputSchema = {
  type: "object" as const,
  properties: {
    groupId: { type: "string" },
    state: {
      type: "string",
      enum: [
        "Unknown",
        "PreparingRebalance",
        "CompletingRebalance",
        "Stable",
        "Dead",
        "Empty",
      ],
    },
    protocolType: { type: "string" },
    protocol: { type: "string" },
    members: { type: "array", items: consumerGroupMemberSchema },
    topicsWithOffsets: { type: "array", items: topicLagSchema },
    totalLag: { type: "string" },
  },
  required: [
    "groupId",
    "state",
    "protocolType",
    "protocol",
    "members",
    "topicsWithOffsets",
    "totalLag",
  ],
};
