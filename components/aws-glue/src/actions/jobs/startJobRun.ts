import { StartJobRunCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { startJobRunExamplePayload } from "../../examplePayloads";
import { startJobRunInputs } from "../../inputs";

export const startJobRun = action({
  display: {
    label: "Start Job Run",
    description: "Starts a job run using an AWS Glue job definition.",
  },
  perform: async (
    _context,
    { awsRegion, name, capacity, security, args, awsConnection },
  ) => {
    const glue = await createClient({ awsRegion, awsConnection });

    const startCrawlerParams = {
      JobName: name,
      MaxCapacity: capacity,
      Arguments: args,
      SecurityConfiguration: security,
    };
    const command = new StartJobRunCommand(startCrawlerParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: startJobRunInputs,
  examplePayload: startJobRunExamplePayload,
});
