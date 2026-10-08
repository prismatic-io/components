export const publishMessagesExamplePayload = {
  data: [
    {
      topicName: "order-events",
      partition: 0,
      errorCode: 0,
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
