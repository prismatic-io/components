import { action } from "@prismatic-io/spectral";
import {
  DescribeStatementCommand,
  type DescribeStatementCommandInput,
} from "@aws-sdk/client-redshift-data";
import { createRedshiftClient } from "../../client";
import { describeStatementInputs } from "../../inputs";
import { describeStatementExamplePayload } from "../../examplePayloads";

export const describeStatement = action({
  display: {
    label: "Describe Statement",
    description: "Get detailed information about a specific SQL statement in Redshift.",
  },
  inputs: describeStatementInputs,
  perform: async (context, { awsConnection, awsRegion, statementId }) => {
    const client = await createRedshiftClient(awsConnection, awsRegion, context.debug.enabled);

    const commandInput: DescribeStatementCommandInput = {
      Id: statementId,
    };

    const command = new DescribeStatementCommand(commandInput);
    const response = await client.send(command);

    return {
      data: response,
    };
  },
  examplePayload: describeStatementExamplePayload,
});
