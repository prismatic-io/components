import { ListCrawlersCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { listCrawlersExamplePayload } from "../examplePayloads";
import { awsRegion, connectionInput, marker, maxItems } from "../inputs";

export const listCrawlers = action({
  display: {
    label: "List Crawlers",
    description: "List Crawlers available in AWS Glue",
  },
  perform: async (context, params) => {
    const glue = await createClient({
      awsRegion: params.awsRegion,
      awsConnection: params.awsConnection,
    });
    const listCrawlersParams = {
      MaxResults: util.types.toInt(params.maxItems) || undefined,
      NextToken: util.types.toString(params.marker) || undefined,
    };
    const command = new ListCrawlersCommand(listCrawlersParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: { awsRegion, maxItems, marker, awsConnection: connectionInput },
  examplePayload: listCrawlersExamplePayload,
});
