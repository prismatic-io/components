import { ListCrawlersCommand } from "@aws-sdk/client-glue";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCrawlersExamplePayload } from "../../examplePayloads";
import { listCrawlersInputs } from "../../inputs";

export const listCrawlers = action({
  display: {
    label: "List Crawlers",
    description: "Lists crawlers available in AWS Glue.",
  },
  perform: async (_context, params) => {
    const glue = await createClient({
      awsRegion: params.awsRegion,
      awsConnection: params.awsConnection,
    });
    const listCrawlersParams = {
      MaxResults: params.maxItems,
      NextToken: params.marker,
    };
    const command = new ListCrawlersCommand(listCrawlersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: listCrawlersInputs,
  examplePayload: listCrawlersExamplePayload,
});
