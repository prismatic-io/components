import { dataSource } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import { connectionInputs } from "../inputs";
import { listQueuesFn } from "../utils";

export const selectQueue = dataSource({
  display: {
    label: "Select Queue",
    description: "Select an SQS queue from a list",
  },
  dataSourceType: "picklist",
  perform: async (context, params) => {
    const client = await createSQSClient(params);
    const { data } = await listQueuesFn({
      client,
      ...params,
      fetchAll: true,
    });
    return { result: data.QueueUrls };
  },
  inputs: {
    ...connectionInputs,
    awsRegion: {
      ...connectionInputs.awsRegion,
      dataSource: undefined,
      model: undefined, 
    },
  },
});
