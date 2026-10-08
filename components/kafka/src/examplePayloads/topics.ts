export const listTopicsExamplePayload = {
  data: {
    topics: [
      {
        name: "order-events",
        partitions: 3,
        isInternal: false,
      },
      {
        name: "user-activity",
        partitions: 6,
        isInternal: false,
      },
    ],
    internalTopics: [
      {
        name: "__consumer_offsets",
        partitions: 50,
        isInternal: true,
      },
    ],
    totalCount: 3,
  },
};
