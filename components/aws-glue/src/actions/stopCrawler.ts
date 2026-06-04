import { StopCrawlerCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { stopCrawlerExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, name } from "../inputs";

export const stopCrawler = action({
  display: {
    label: "Stop Crawler",
    description: "If the specified crawler is running, stops the crawl",
  },
  perform: async (context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({
      awsRegion: awsRegion,
      awsConnection: awsConnection,
    });
    const listTriggersParams = { Name: util.types.toString(name) };
    const command = new StopCrawlerCommand(listTriggersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: {
    awsRegion,
    name: { ...name, dataSource: "selectCrawler" },
    awsConnection: connectionInput,
  },
  examplePayload: stopCrawlerExamplePayload,
});
