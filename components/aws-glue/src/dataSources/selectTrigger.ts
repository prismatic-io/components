import { ListTriggersCommand } from "@aws-sdk/client-glue";
import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { awsRegion, connectionInput } from "../inputs";

export const selectTrigger = dataSource({
  display: {
    label: "Select Trigger",
    description: "A picklist of triggers available in your AWS Glue account.",
  },
  inputs: {
    awsRegion: { ...awsRegion, dataSource: undefined },
    awsConnection: connectionInput,
  },
  perform: async (_context, { awsRegion, awsConnection }) => {
    const glue = await createClient({ awsRegion, awsConnection });

    const allTriggerNames: string[] = [];
    let nextToken: string | undefined;

    do {
      const command = new ListTriggersCommand({
        MaxResults: 50,
        NextToken: nextToken,
      });
      const response = await glue.send(command);
      if (response.TriggerNames) {
        allTriggerNames.push(...response.TriggerNames);
      }
      nextToken = response.NextToken || undefined;
    } while (nextToken);

    return {
      result: allTriggerNames
        .map<Element>((name) => ({
          label: name,
          key: name,
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Trigger", key: "Example Trigger" }],
  },
});
