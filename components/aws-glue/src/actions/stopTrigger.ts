import { StopTriggerCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { stopTriggerExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, name } from "../inputs";

export const stopTrigger = action({
  display: {
    label: "Stop trigger",
    description: "Stops a specified trigger",
  },
  perform: async (context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = { Name: util.types.toString(name) };
    const command = new StopTriggerCommand(listTriggersParams);
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
  examplePayload: stopTriggerExamplePayload,
});
