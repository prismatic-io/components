





export const publishMessagesExamplePayload = {
  data: [
    {
      topicName: "order-events",
      partition: 0,
      errorCode: 0,
      offset: "142",
      timestamp: "1711929600000",
      baseOffset: "142",
      logAppendTime: "-1",
      logStartOffset: "0",
    },
  ] as {
    topicName: string;
    partition: number;
    errorCode: number;
    offset?: string;
    timestamp?: string;
    baseOffset?: string;
    logAppendTime?: string;
    logStartOffset?: string;
  }[],
};








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
