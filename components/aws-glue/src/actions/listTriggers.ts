import { ListTriggersCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { listTriggersExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, marker, maxItems } from "../inputs";

export const listTriggers = action({
  display: {
    label: "List Triggers",
    description: "List the names of all triggers in the account.",
  },
  perform: async (context, params) => {
    const glue = await createClient({
      awsRegion: params.awsRegion,
      awsConnection: params.awsConnection,
    });
    const listTriggersParams = {
      MaxResults: util.types.toInt(params.maxItems) || undefined,
      NextToken: util.types.toString(params.marker) || undefined,
    };
    const command = new ListTriggersCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: { awsRegion, maxItems, marker, awsConnection: connectionInput },
  examplePayload: listTriggersExamplePayload,
});
