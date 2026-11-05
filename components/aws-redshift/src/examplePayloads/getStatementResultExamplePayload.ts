import type { GetStatementResultCommandOutput } from "@aws-sdk/client-redshift-data";

export const getStatementResultExamplePayload: { data: GetStatementResultCommandOutput } = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "example-request-id-12345-67890-abcdef",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ColumnMetadata: [
      {
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: true,
        label: "id",
        length: 0,
        name: "id",
        nullable: 1,
        precision: 10,
        scale: 0,
        schemaName: "public",
        tableName: "users",
        typeName: "int4",
      },
      {
        isCaseSensitive: true,
        isCurrency: false,
        isSigned: false,
        label: "name",
        length: 0,
        name: "name",
        nullable: 1,
        precision: 50,
        scale: 0,
        schemaName: "public",
        tableName: "users",
        typeName: "varchar",
      },
      {
        isCaseSensitive: true,
        isCurrency: false,
        isSigned: false,
        label: "email",
        length: 0,
        name: "email",
        nullable: 1,
        precision: 100,
        scale: 0,
        schemaName: "public",
        tableName: "users",
        typeName: "varchar",
      },
    ],
    Records: [
      [
        {
          longValue: 1,
        },
        {
          stringValue: "Alice",
        },
        {
          stringValue: "alice@example.com",
        },
      ],
    ],
    TotalNumRows: 1,
  },
};
