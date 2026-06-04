import { ListJobsCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { listJobsExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, marker, maxItems } from "../inputs";

export const listjobs = action({
  display: {
    label: "List Jobs",
    description: "List job schemas available in AWS Glue",
  },
  perform: async (context, params) => {
    const glue = await createClient({
      awsRegion: params.awsRegion,
      awsConnection: params.awsConnection,
    });
    const listJobsParams = {
      MaxResults: util.types.toInt(params.maxItems) || undefined,
      NextToken: util.types.toString(params.marker) || undefined,
    };
    const command = new ListJobsCommand(listJobsParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: { awsRegion, marker, maxItems, awsConnection: connectionInput },
  examplePayload: listJobsExamplePayload,
});
