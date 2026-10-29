import { StartCrawlerCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { startCrawlerExamplePayload } from "../../examplePayloads";
import { startCrawlerInputs } from "../../inputs";

export const startCrawler = action({
  display: {
    label: "Start Crawler",
    description: "Starts an existing crawler in AWS Glue.",
  },
  perform: async (_context, { awsRegion, name, awsConnection }) => {
    const glue = await createClient({ awsRegion, awsConnection });
    const startCrawlerParams = { Name: name };
    const command = new StartCrawlerCommand(startCrawlerParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: startCrawlerInputs,
  examplePayload: startCrawlerExamplePayload,
});
