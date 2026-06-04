import {
  ListFunctionsCommand,
  type ListFunctionsCommandInput,
} from "@aws-sdk/client-lambda";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { listFunctionsExamplePayload } from "../examplePayloads";
import {
  awsRegion,
  connectionInput,
  dynamicAccessAllInputs,
  marker,
  maxItems,
} from "../inputs";

export const listFunctions = action({
  display: {
    label: "List Function",
    description: "List Information and metadata about all AWS Lambda functions",
  },
  examplePayload: listFunctionsExamplePayload,
  perform: async (_context, params) => {
    const client = await createClient({
      awsConnection: params.awsConnection,
      awsRegion: params.awsRegion,
      dynamicAccessKeyId: params.dynamicAccessKeyId,
      dynamicSecretAccessKey: params.dynamicSecretAccessKey,
      dynamicSessionToken: params.dynamicSessionToken,
    });

    const input: ListFunctionsCommandInput = {
      FunctionVersion: "ALL",
      Marker: util.types.toString(params.marker) || undefined,
      MaxItems: util.types.toInt(params.maxItems) || undefined,
    };
    const command = new ListFunctionsCommand(input);
    const response = await client.send(command);

    return {
      data: response,
    };
  },
  inputs: {
    awsConnection: connectionInput,
    ...dynamicAccessAllInputs,
    awsRegion,
    marker,
    maxItems,
  },
});
