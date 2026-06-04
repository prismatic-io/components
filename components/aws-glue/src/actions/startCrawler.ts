import { StartCrawlerCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { startCrawlerExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, name } from "../inputs";

export const startCrawler = action({
  display: {
    label: "Start Crawler",
    description: "Starts an existing crawler in AWS Glue.",
  },
  perform: async (context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({ awsRegion, awsConnection });
    const startCrawlerParams = { Name: util.types.toString(name) };
    const command = new StartCrawlerCommand(startCrawlerParams);
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
  examplePayload: startCrawlerExamplePayload,
});
