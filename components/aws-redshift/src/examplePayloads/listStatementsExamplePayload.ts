import type { ListStatementsCommandOutput } from "@aws-sdk/client-redshift-data";

export const listStatementsExamplePayload: { data: ListStatementsCommandOutput } = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "example-list-request-id-12345-67890-abcdef",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Statements: [
      {
        CreatedAt: new Date("2025-01-15T10:30:00.000Z"),
        Id: "example-statement-id-12345-67890-abcdef",
        QueryString:
          "CREATE TABLE users (\n  id INT,\n  name VARCHAR(50),\n  email VARCHAR(100)\n);\n",
        ResultFormat: "JSON",
        SecretArn:
          "arn:aws:secretsmanager:us-east-1:123456789012:secret:redshift/example-secret-abc123",
        StatementName: "ExampleStatement",
        Status: "PICKED",
        UpdatedAt: new Date("2025-01-15T10:31:00.000Z"),
      },
    ],
  },
};
