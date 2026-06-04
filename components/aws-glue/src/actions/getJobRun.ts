import { GetJobRunCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { getJobRunExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, name, runId } from "../inputs";

export const getJobRun = action({
  display: {
    label: "Get Job Run",
    description: "Retrieves the metadata for a given job run.",
  },
  perform: async (context, { awsRegion, name, runId, awsConnection }) => {
    const glue = await createClient({
      awsRegion,
      awsConnection: awsConnection,
    });
    const getJobRunParams = {
      JobName: util.types.toString(name),
      RunId: util.types.toString(runId),
      PredecessorsIncluded: false,
    };
    const command = new GetJobRunCommand(getJobRunParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: {
    awsRegion,
    name: { ...name, dataSource: "selectJob" },
    runId,
    awsConnection: connectionInput,
  },
  examplePayload: getJobRunExamplePayload,
});
