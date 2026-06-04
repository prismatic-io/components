import { action } from "@prismatic-io/spectral";
import {
  DescribeStatementCommand,
  type DescribeStatementCommandInput,
  ExecuteStatementCommand,
  GetStatementResultCommand,
  type GetStatementResultCommandInput,
  StatusString,
  type ExecuteStatementCommandInput,
} from "@aws-sdk/client-redshift-data";
import { createRedshiftClient } from "../../client";
import { executeStatementInputs } from "../../inputs";
import { executeStatementExamplePayload } from "../../examplePayloads";

export const executeStatement = action({
  display: {
    label: "Execute SQL Statement",
    description: "Execute a SQL statement in Redshift.",
  },
  inputs: executeStatementInputs,
  perform: async (
    context,
    {
      awsConnection,
      sqlStatement,
      databaseName,
      awsRegion,
      workgroupName,
      clusterIdentifier,
      getStatementResult,
      statementName,
      databaseUser,
      secretArn,
      sqlParameters,
      resultFormat,
      sessionId,
      sessionKeepAliveSeconds,
      clientToken,
    },
  ) => {
    const client = await createRedshiftClient(awsConnection, awsRegion, context.debug.enabled);

    if (!clusterIdentifier && !workgroupName) {
      throw new Error("Either Cluster Identifier or Workgroup Name must be provided");
    }

    const commandInput: ExecuteStatementCommandInput = {
      Sql: sqlStatement,
      Database: databaseName,
      StatementName: statementName,
      DbUser: databaseUser,
      SecretArn: secretArn,
      Parameters: sqlParameters,
      ResultFormat: resultFormat,
      SessionId: sessionId,
      SessionKeepAliveSeconds: sessionKeepAliveSeconds,
      ClientToken: clientToken,
      ClusterIdentifier: clusterIdentifier,
      WorkgroupName: workgroupName,
    };

    const command = new ExecuteStatementCommand(commandInput);
    const response = await client.send(command);
    if (!getStatementResult)
      return {
        data: { executeStatement: response },
      };

    const id = response.Id;
    if (!id) {
      throw new Error("Statement ID not found in execute statement response");
    }

    const describeCommandInput: DescribeStatementCommandInput = {
      Id: id,
    };

    let needsToWait = true;
    let status: StatusString | undefined;
    let hasResultSet = false;

    do {
      const describeCommand = new DescribeStatementCommand(describeCommandInput);
      const describeResponse = await client.send(describeCommand);
      status = describeResponse.Status;
      if (!status) {
        throw new Error("Status not found in describe statement response");
      }
      needsToWait = !["FINISHED", "FAILED", "ABORTED"].includes(status);
      hasResultSet = describeResponse.HasResultSet ?? false;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } while (needsToWait);

    if (status === StatusString.FAILED) {
      throw new Error("Statement failed");
    }

    if (status === StatusString.ABORTED) {
      throw new Error("Statement aborted");
    }
    if (hasResultSet) {
      
      const getStatementResultCommandInput: GetStatementResultCommandInput = {
        Id: id,
      };

      const getStatementResultCommand = new GetStatementResultCommand(
        getStatementResultCommandInput,
      );
      const getStatementResultResponse = await client.send(getStatementResultCommand);

      return {
        data: { executeStatement: response, statementResults: getStatementResultResponse },
      };
    }
    return {
      data: { executeStatement: response, statementResults: null },
    };
  },
  examplePayload: executeStatementExamplePayload,
});
