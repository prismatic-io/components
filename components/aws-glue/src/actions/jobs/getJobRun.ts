import {
  GetJobRunCommand,
  type GetJobRunCommandInput,
} from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getJobRunExamplePayload } from "../../examplePayloads";
import { getJobRunInputs } from "../../inputs";

export const getJobRun = action({
  display: {
    label: "Get Job Run",
    description: "Retrieves the metadata for a given job run.",
  },
  perform: async (_context, { awsRegion, name, runId, awsConnection }) => {
    const glue = await createClient({
      awsRegion,
      awsConnection: awsConnection,
    });
    const getJobRunParams: GetJobRunCommandInput = {
      JobName: name,
      RunId: runId,
      PredecessorsIncluded: false,
    };
    const command = new GetJobRunCommand(getJobRunParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: getJobRunInputs,
  examplePayload: getJobRunExamplePayload,
});
