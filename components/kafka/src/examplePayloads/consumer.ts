






export const getConsumerGroupStatusExamplePayload = {
  data: {
    groupId: "order-processing-group",
    state: "Stable",
    protocolType: "consumer",
    protocol: "RoundRobinAssigner",
    members: [
      {
        memberId: "order-processor-a2f4c8e1-7b3d-4e9a-b5c6-d8f0e1a2b3c4",
        clientId: "order-processor",
        clientHost: "/10.0.1.42",
      },
    ],
    topicsWithOffsets: [
      {
        topic: "order-events",
        partitions: [
          {
            partition: 0,
            committedOffset: "1250",
            currentOffset: "1255",
            lag: "5",
          },
          {
            partition: 1,
            committedOffset: "980",
            currentOffset: "980",
            lag: "0",
          },
        ],
        totalLag: "5",
      },
    ],
    totalLag: "5",
  },
};
