import { StopTriggerCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { stopTriggerExamplePayload } from "../../examplePayloads";
import { stopTriggerInputs } from "../../inputs";

export const stopTrigger = action({
  display: {
    label: "Stop Trigger",
    description: "Stops a specified trigger.",
  },
  perform: async (_context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = { Name: name };
    const command = new StopTriggerCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: stopTriggerInputs,
  examplePayload: stopTriggerExamplePayload,
});
