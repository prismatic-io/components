import { BatchStopJobRunCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { stopJobRunExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, jobRunIds, name } from "../inputs";

export const stopJobRun = action({
  display: {
    label: "Stop Job Run",
    description: "Stops one or more job runs for a specified job definition",
  },
  perform: async (context, { awsRegion, name, jobRunIds, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = {
      JobName: util.types.toString(name),
      JobRunIds: jobRunIds.map((id) => util.types.toString(id)),
    };
    const command = new BatchStopJobRunCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: {
    awsRegion,
    name: { ...name, dataSource: "selectJob" },
    jobRunIds,
    awsConnection: connectionInput,
  },

  examplePayload: stopJobRunExamplePayload,
});
