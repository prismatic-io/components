import { ListJobsCommand } from "@aws-sdk/client-glue";
import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { awsRegion, connectionInput } from "../inputs";

export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "A picklist of jobs available in your AWS Glue account.",
  },
  inputs: {
    awsRegion: { ...awsRegion, dataSource: undefined },
    awsConnection: connectionInput,
  },
  perform: async (_context, { awsRegion, awsConnection }) => {
    const glue = await createClient({ awsRegion, awsConnection });

    const allJobNames: string[] = [];
    let nextToken: string | undefined;

    do {
      const command = new ListJobsCommand({
        MaxResults: 50,
        NextToken: nextToken,
      });
      const response = await glue.send(command);
      if (response.JobNames) {
        allJobNames.push(...response.JobNames);
      }
      nextToken = response.NextToken || undefined;
    } while (nextToken);

    return {
      result: allJobNames
        .map<Element>((name) => ({
          label: name,
          key: name,
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Job", key: "Example Job" }],
  },
});
