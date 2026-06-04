import { ListCrawlersCommand } from "@aws-sdk/client-glue";
import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { awsRegion, connectionInput } from "../inputs";

export const selectCrawler = dataSource({
  display: {
    label: "Select Crawler",
    description: "A picklist of crawlers available in your AWS Glue account.",
  },
  inputs: {
    awsRegion: { ...awsRegion, dataSource: undefined },
    awsConnection: connectionInput,
  },
  perform: async (_context, { awsRegion, awsConnection }) => {
    const glue = await createClient({ awsRegion, awsConnection });

    const allCrawlerNames: string[] = [];
    let nextToken: string | undefined;

    do {
      const command = new ListCrawlersCommand({
        MaxResults: 50,
        NextToken: nextToken,
      });
      const response = await glue.send(command);
      if (response.CrawlerNames) {
        allCrawlerNames.push(...response.CrawlerNames);
      }
      nextToken = response.NextToken || undefined;
    } while (nextToken);

    return {
      result: allCrawlerNames
        .map<Element>((name) => ({
          label: name,
          key: name,
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Crawler", key: "Example Crawler" }],
  },
});
