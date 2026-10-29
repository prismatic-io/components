import { StartTriggerCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { startTriggerExamplePayload } from "../../examplePayloads";
import { startTriggerInputs } from "../../inputs";

export const startTrigger = action({
  display: {
    label: "Start Trigger",
    description: "Starts an existing trigger in AWS Glue.",
  },
  perform: async (_context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = { Name: name };
    const command = new StartTriggerCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: startTriggerInputs,
  examplePayload: startTriggerExamplePayload,
});
