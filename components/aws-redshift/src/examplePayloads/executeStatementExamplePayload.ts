import type {
  ExecuteStatementCommandOutput,
  GetStatementResultCommandOutput,
} from "@aws-sdk/client-redshift-data";
import { getStatementResultExamplePayload } from "./getStatementResultExamplePayload";

export const executeStatementExamplePayload: {
  data: {
    executeStatement: ExecuteStatementCommandOutput;
    statementResults?: GetStatementResultCommandOutput | null;
  };
} = {
  data: {
    executeStatement: {
      $metadata: {
        httpStatusCode: 200,
        requestId: "example-request-id-12345-67890-abcdef",
        extendedRequestId: undefined,
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0,
      },
      CreatedAt: new Date("2025-01-15T10:30:00.000Z"),
      Database: "example_database",
      Id: "example-statement-id-12345-67890-abcdef",
      SecretArn:
        "arn:aws:secretsmanager:us-east-1:123456789012:secret:redshift/example-secret-abc123",
      WorkgroupName: "example_workgroup",
    },
    statementResults: getStatementResultExamplePayload.data,
  },
};
