import { action } from "@prismatic-io/spectral";
import {
  GetStatementResultCommand,
  type GetStatementResultCommandInput,
} from "@aws-sdk/client-redshift-data";
import { createRedshiftClient } from "../../client";
import { getStatementResultInputs } from "../../inputs";
import { getStatementResultExamplePayload } from "../../examplePayloads";

export const getStatementResult = action({
  display: {
    label: "Get Statement Result",
    description: "Retrieve the results of an executed SQL statement from Redshift.",
  },
  inputs: getStatementResultInputs,
  perform: async (context, { awsConnection, awsRegion, statementId, nextToken }) => {
    const client = await createRedshiftClient(awsConnection, awsRegion, context.debug.enabled);

    
    const commandInput: GetStatementResultCommandInput = {
      Id: statementId,
      NextToken: nextToken,
    };

    const command = new GetStatementResultCommand(commandInput);
    const response = await client.send(command);

    return {
      data: response,
    };
  },
  examplePayload: getStatementResultExamplePayload,
});
