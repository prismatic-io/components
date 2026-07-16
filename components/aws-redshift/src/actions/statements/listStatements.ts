import { action } from "@prismatic-io/spectral";
import {
  ListStatementsCommand,
  type ListStatementsCommandOutput,
} from "@aws-sdk/client-redshift-data";
import { createRedshiftClient } from "../../client";
import { listStatementsInputs } from "../../inputs";
import { listStatementsExamplePayload } from "../../examplePayloads";
import { getAllStatements } from "../../util";
export const listStatements = action({
  display: {
    label: "List Statements",
    description: "List executed SQL statements in Redshift.",
  },
  inputs: listStatementsInputs,
  perform: async (
    context,
    {
      awsConnection,
      awsRegion,
      status,
      fetchAll,
      filters = {},
      pagination = {},
    },
  ) => {
    const client = await createRedshiftClient(
      awsConnection,
      awsRegion,
      context.debug.enabled,
    );
    if (fetchAll) {
      const { allStatements, lastResponse } = await getAllStatements({
        client,
        databaseName: filters.databaseName,
        workgroupName: filters.workgroupName,
        clusterIdentifier: filters.clusterIdentifier,
        status,
        statementName: filters.statementName,
      });
      return {
        data: {
          ...(lastResponse as ListStatementsCommandOutput),
          Statements: allStatements,
        },
      };
    }
    const command = new ListStatementsCommand({
      Database: filters.databaseName,
      WorkgroupName: filters.workgroupName,
      ClusterIdentifier: filters.clusterIdentifier,
      Status: status,
      StatementName: filters.statementName,
      NextToken: pagination.nextToken,
      MaxResults: pagination.maxResults,
    });
    const response = await client.send(command);
    return { data: response };
  },
  examplePayload: listStatementsExamplePayload,
});
