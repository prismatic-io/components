import {
  type FunctionConfiguration,
  ListFunctionsCommand,
} from "@aws-sdk/client-lambda";
import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { awsRegion, connectionInput, dynamicAccessAllInputs } from "../inputs";

export const selectFunction = dataSource({
  display: {
    label: "Select Function",
    description: "A picklist of AWS Lambda functions in the selected region.",
  },
  inputs: {
    awsConnection: connectionInput,
    ...dynamicAccessAllInputs,
    awsRegion: { ...awsRegion, dataSource: undefined },
  },
  perform: async (_context, params) => {
    const client = await createClient({
      awsConnection: params.awsConnection,
      awsRegion: params.awsRegion,
      dynamicAccessKeyId: params.dynamicAccessKeyId,
      dynamicSecretAccessKey: params.dynamicSecretAccessKey,
      dynamicSessionToken: params.dynamicSessionToken,
    });

    const functions: FunctionConfiguration[] = [];
    let marker: string | undefined;

    do {
      const command = new ListFunctionsCommand({
        FunctionVersion: "ALL",
        Marker: marker,
        MaxItems: 50,
      });
      const response = await client.send(command);
      if (response.Functions) {
        functions.push(...response.Functions);
      }
      marker = response.NextMarker;
    } while (marker);

    return {
      result: functions
        .map<Element>((fn) => ({
          label: fn.FunctionName || fn.FunctionArn || "Unknown",
          key: (fn.FunctionName || fn.FunctionArn || "").toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "my-lambda-function", key: "my-lambda-function" },
      { label: "process-orders", key: "process-orders" },
    ],
  },
});
