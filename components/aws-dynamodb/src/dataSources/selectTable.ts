import { dataSource, type Element } from "@prismatic-io/spectral";
import { awsRegion, connectionInput } from "../inputs";
import { createDynamoClient } from "../auth";
import { ListTablesCommand, type ListTablesCommandOutput } from "@aws-sdk/client-dynamodb";

export const selectTable = dataSource({
  display: {
    label: "Select Table",
    description: "Select a table from the list of tables",
  },
  inputs: {
    awsConnection: connectionInput,
    awsRegion: { ...awsRegion, dataSource: undefined, model: undefined }, 
  },
  perform: async (context, { awsConnection, awsRegion }) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
    });
    const command = new ListTablesCommand({});
    const { TableNames }: ListTablesCommandOutput = await client.send(command);

    const result = TableNames
      ? TableNames.map<Element>((table) => ({
          label: table,
          key: table,
        }))
      : [];
    return { result };
  },
  dataSourceType: "picklist",
});
