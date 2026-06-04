import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import { url, maxNumber, waitTime, connectionInputs } from "../inputs";
import { MAX_NUMBER_OF_MESSAGES_RECEIVE } from "../constants";
import { MAX_WAIT_TIME_RECEIVE } from "../constants";
import { receiveMessagesExample } from "../examplePayloads";

const performFunction = async (context, params) => {
  const client = await createSQSClient(params);

  const response = await client.receiveMessage({
    AttributeNames: ["All"],
    MaxNumberOfMessages: params.maxNumber,
    WaitTimeSeconds: params.waitTime || undefined,
    MessageAttributeNames: ["All"],
    QueueUrl: params.url,
  });

  return {
    data: { ...response, Messages: response.Messages || [] },
  };
};

const receiveMessages = action({
  display: {
    label: "Receive Messages",
    description: "Receive messages from an Amazon SQS Queue",
  },
  perform: performFunction,
  inputs: { url, maxNumber, waitTime, ...connectionInputs },
  examplePayload: receiveMessagesExample,
});

export const receiveMessagesPolling = action({
  display: receiveMessages.display,
  perform: async (context, params) => {
    const finalParams = {
      ...params,
      maxNumber: MAX_NUMBER_OF_MESSAGES_RECEIVE,
      waitTime: MAX_WAIT_TIME_RECEIVE,
    };
    return await performFunction(context, finalParams);
  },
  inputs: {
    url: { ...url, dataSource: undefined },
    ...connectionInputs,
    
    awsRegion: { ...connectionInputs.awsRegion, dataSource: undefined },
  },
});

export default receiveMessages;
