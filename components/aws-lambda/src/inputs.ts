import { input } from "@prismatic-io/spectral";

export { awsRegion, connectionInput, dynamicAccessAllInputs } from "aws-utils";

export const functionName = input({
  label: "Function Name or ARN",
  placeholder: "Function Name or ARN",
  type: "string",
  required: true,
  comments:
    "This can be a function name (my-function), name with alias (my-function:v1), or function ARN (arn:aws:lambda:us-west-2:123456789012:function:my-function).",
  example: "my-function",
  dataSource: "selectFunction",
});

export const invokeArgs = input({
  label: "Payload",
  placeholder: "Payload",
  type: "string",
  required: false,
  comments:
    "The payload to send the lambda function. This can be a JSON string or object that can be serialized into JSON.",
  example: `{"firstKey":"firstValue","secondKey":"secondValue"}`,
});

export const invokeType = input({
  label: "Invoke Type",
  placeholder: "Invoke Type",
  type: "string",
  required: true,
  default: "RequestResponse",
  comments:
    "RequestResponse (default) - Invoke the function synchronously. Event - Invoke the function asynchronously. DryRun - Validate parameter values and verify that the user or role has permission to invoke the function.",
  model: [
    { label: "Request Response (Default)", value: "RequestResponse" },
    { label: "Event", value: "Event" },
    { label: "DryRun", value: "DryRun" },
  ],
});

export const maxItems = input({
  label: "Max Items",
  type: "string",
  required: false,
  comments:
    "Provide an integer value for the maximum amount of items that will be returned. Provide a value from 1 to 50.",
  example: `20`,
});

export const marker = input({
  label: "Marker",
  type: "string",
  required: false,
  comments:
    "Specify the pagination token that's returned by a previous request to retrieve the next page of results",
  example: `lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E`,
});
