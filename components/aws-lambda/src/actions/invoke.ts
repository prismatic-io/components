import {
  type InvocationType,
  InvokeCommand,
  type InvokeCommandInput,
} from "@aws-sdk/client-lambda";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { invokeExamplePayload } from "../examplePayloads";
import {
  awsRegion,
  connectionInput,
  dynamicAccessAllInputs,
  functionName,
  invokeArgs,
  invokeType,
} from "../inputs";
import { getPayload, hasProperty } from "../util";

export const invoke = action({
  display: {
    label: "Invoke",
    description: "Invoke an AWS Lambda function",
  },
  examplePayload: invokeExamplePayload,
  perform: async (
    _context,
    {
      awsRegion,
      invokeArgs,
      functionName,
      invokeType,
      connectionInput,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const client = await createClient({
      awsConnection: connectionInput,
      awsRegion,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    });

    const input: InvokeCommandInput = {
      FunctionName: functionName as string, 
      InvocationType: invokeType as InvocationType,
      LogType: "None",
      Payload: getPayload(invokeArgs) as InvokeCommandInput["Payload"],
    };
    const command = new InvokeCommand(input);
    const response = await client.send(command);
    const payload = response.Payload
      ? Buffer.from(response.Payload).toString()
      : "";
    try {
      const parsedData = JSON.parse(payload);
      const contentType =
        hasProperty(parsedData, "contentType") ||
        hasProperty(parsedData, "Content-Type");
      const returnData = {
        ...parsedData,
      };
      if (contentType) {
        returnData.contentType = contentType;
      }
      return {
        data: {
          ...response,
          payload: {
            ...returnData,
          },
        },
      };
    } catch (_err) {
      return {
        data: { ...response, payload },
      };
    }
  },
  inputs: {
    connectionInput,
    ...dynamicAccessAllInputs,
    awsRegion,
    functionName,
    invokeType,
    invokeArgs,
  },
});
