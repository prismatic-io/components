import { StopCrawlerCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { stopCrawlerExamplePayload } from "../../examplePayloads";
import { stopCrawlerInputs } from "../../inputs";

export const stopCrawler = action({
  display: {
    label: "Stop Crawler",
    description: "Stops the specified crawler if it is currently running.",
  },
  perform: async (_context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = { Name: name };
    const command = new StopCrawlerCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: stopCrawlerInputs,
  examplePayload: stopCrawlerExamplePayload,
});
