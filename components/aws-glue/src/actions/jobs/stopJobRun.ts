import { BatchStopJobRunCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { stopJobRunExamplePayload } from "../../examplePayloads";
import { stopJobRunInputs } from "../../inputs";

export const stopJobRun = action({
  display: {
    label: "Stop Job Run",
    description: "Stops one or more job runs for a specified job definition.",
  },
  perform: async (_context, { awsRegion, name, jobRunIds, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = {
      JobName: name,
      JobRunIds: jobRunIds.map((id) => util.types.toString(id)),
    };
    const command = new BatchStopJobRunCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: stopJobRunInputs,

  examplePayload: stopJobRunExamplePayload,
});
