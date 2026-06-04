import { StartTriggerCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { startTriggerExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, name } from "../inputs";

export const startTrigger = action({
  display: {
    label: "Start Trigger",
    description: "Starts an existing trigger in AWS Glue.",
  },
  perform: async (context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = { Name: util.types.toString(name) };
    const command = new StartTriggerCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: {
    awsRegion,
    name: { ...name, dataSource: "selectTrigger" },
    awsConnection: connectionInput,
  },
  examplePayload: startTriggerExamplePayload,
});
