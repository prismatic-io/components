import { ListTriggersCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTriggersExamplePayload } from "../../examplePayloads";
import { listTriggersInputs } from "../../inputs";

export const listTriggers = action({
  display: {
    label: "List Triggers",
    description: "Lists the names of all triggers in the account.",
  },
  perform: async (_context, params) => {
    const glue = await createClient({
      awsRegion: params.awsRegion,
      awsConnection: params.awsConnection,
    });
    const listTriggersParams = {
      MaxResults: params.maxItems,
      NextToken: params.marker,
    };
    const command = new ListTriggersCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: listTriggersInputs,
  examplePayload: listTriggersExamplePayload,
});
