import type { DescribeStatementCommandOutput } from "@aws-sdk/client-redshift-data";

export const describeStatementExamplePayload: { data: DescribeStatementCommandOutput } = {
  data: {
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
    Duration: 257716773,
    HasResultSet: false,
    Id: "example-statement-id-12345-67890-abcdef",
    QueryString:
      "INSERT INTO example_table (id, name, email)\nVALUES (1, 'Example User', 'user@example.com');\n",
    RedshiftPid: 123456789,
    RedshiftQueryId: 987654,
    ResultFormat: "JSON",
    ResultRows: 1,
    ResultSize: 0,
    SecretArn: "arn:aws:secretsmanager:us-east-1:123456789012:secret:redshift/example-secret-name",
    Status: "FINISHED",
    UpdatedAt: new Date("2025-01-15T10:31:00.000Z"),
    WorkgroupName: "example-workgroup",
  },
};
