import { ListJobsCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobsExamplePayload } from "../../examplePayloads";
import { listJobsInputs } from "../../inputs";

export const listJobs = action({
  display: {
    label: "List Jobs",
    description: "Lists jobs available in AWS Glue.",
  },
  perform: async (_context, params) => {
    const glue = await createClient({
      awsRegion: params.awsRegion,
      awsConnection: params.awsConnection,
    });
    const listJobsParams = {
      MaxResults: params.maxItems,
      NextToken: params.marker,
    };
    const command = new ListJobsCommand(listJobsParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: listJobsInputs,
  examplePayload: listJobsExamplePayload,
});
