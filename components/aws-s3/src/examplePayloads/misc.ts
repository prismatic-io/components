import type { GetCallerIdentityCommandOutput } from "@aws-sdk/client-sts";
export const getCurrentAccountExamplePayload: {
  data: GetCallerIdentityCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "b81eb768-e79a-52a1-9be8-e90175212345",
      extendedRequestId: null,
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Account: "123456789012",
    Arn: "arn:aws:iam::123456789012:user/Alice",
    UserId: "AIDACKCEVSQ6C2EXAMPLE",
  },
};
