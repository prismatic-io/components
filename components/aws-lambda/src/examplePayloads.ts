






import type { ListFunctionsCommandOutput } from "@aws-sdk/client-lambda";






export const invokeExamplePayload: { data: Record<string, unknown> } = {
  data: {
    StatusCode: 200,
    ExecutedVersion: "$LATEST",
    FunctionError: undefined,
    LogResult: undefined,
    payload: {
      statusCode: 200,
      body: '{"message":"Hello from Lambda!"}',
    },
    $metadata: {
      httpStatusCode: 200,
      requestId: "a1b2c3d4-5678-90ab-cdef-EXAMPLE11111",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};






export const listFunctionsExamplePayload: {
  data: ListFunctionsCommandOutput;
} = {
  data: {
    Functions: [
      {
        FunctionName: "my-lambda-function",
        FunctionArn:
          "arn:aws:lambda:us-east-1:123456789012:function:my-lambda-function",
        Runtime: "nodejs20.x",
        Role: "arn:aws:iam::123456789012:role/lambda-execution-role",
        Handler: "index.handler",
        CodeSize: 5765,
        Description: "Processes incoming webhook events",
        Timeout: 30,
        MemorySize: 128,
        LastModified: "2025-10-15T18:30:00.000+0000",
        CodeSha256: "YFgDgEKG3aIKEwfCVqwDKJ3MnERN0bI8bVkWbK2EXAMPLE",
        Version: "$LATEST",
        TracingConfig: {
          Mode: "PassThrough",
        },
        RevisionId: "a1b2c3d4-5678-90ab-cdef-EXAMPLE22222",
        PackageType: "Zip",
        Architectures: ["x86_64"],
        EphemeralStorage: {
          Size: 512,
        },
        SnapStart: {
          ApplyOn: "None",
          OptimizationStatus: "Off",
        },
        LoggingConfig: {
          LogFormat: "Text",
          LogGroup: "/aws/lambda/my-lambda-function",
        },
      },
    ],
    NextMarker: undefined,
    $metadata: {
      httpStatusCode: 200,
      requestId: "a1b2c3d4-5678-90ab-cdef-EXAMPLE33333",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
