import { action } from "@prismatic-io/spectral";
import { awsRegion, connectionInput, fetchAll } from "../inputs";
import { createDynamoClient } from "../auth";
import { ListTablesCommand, paginateListTables } from "@aws-sdk/client-dynamodb";
import { listTablesExamplePayload } from "../examplePayloads";

export const listTables = action({
  display: {
    label: "List Tables",
    description: "List all DynamoDB Tables",
  },
  perform: async (context, { awsConnection, awsRegion, fetchAll }) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    if (fetchAll) {
      const tables = [];
      const result = paginateListTables({ client }, {});
      for await (const page of result) {
        tables.push(...(page.TableNames || []));
      }

      return { data: { result: tables, found: tables?.length > 0 } };
    }

    const command = new ListTablesCommand({});
    const result = await client.send(command);
    return { data: { result, found: (result.TableNames?.length ?? 0) > 0 } };
  },
  inputs: {
    awsRegion,
    awsConnection: connectionInput,
    fetchAll,
  },
  examplePayload: listTablesExamplePayload,
});
