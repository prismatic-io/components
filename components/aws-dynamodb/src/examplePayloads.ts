





import type {
  CreateTableCommandOutput,
  DeleteItemCommandOutput,
  DeleteTableCommandOutput,
  DescribeTableCommandOutput,
  GetItemCommandOutput,
  PutItemCommandOutput,
  QueryCommandOutput,
  UpdateItemCommandOutput,
  ListTablesCommandOutput,
  ExecuteStatementCommandOutput,
} from "@aws-sdk/client-dynamodb";
import type { ResponseMetadata } from "@aws-sdk/types";







export const createItemExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "ABC123DEF456GHI789JKL012MNO345PQ",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ConsumedCapacity: {
      TableName: "Users",
      CapacityUnits: 1,
    },
  } as PutItemCommandOutput,
};



export const getItemExamplePayload = {
  data: {
    result: {
      $metadata: {
        httpStatusCode: 200,
        requestId: "Q46HIT95LVKPO8HB708JFS47VV4KQNSO5AEMVJF66Q9ASUAAJG",
        extendedRequestId: undefined,
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0,
      },
      Item: {
        userId: { S: "user-12345" },
        email: { S: "john.doe@example.com" },
        firstName: { S: "John" },
        lastName: { S: "Doe" },
        age: { N: "32" },
        isActive: { BOOL: true },
        createdAt: { S: "2024-01-15T10:30:00.000Z" },
        lastLogin: { S: "2024-03-20T14:22:10.000Z" },
        preferences: {
          M: {
            theme: { S: "dark" },
            notifications: { BOOL: true },
          },
        },
        tags: {
          L: [{ S: "premium" }, { S: "verified" }],
        },
      },
      ConsumedCapacity: {
        TableName: "Users",
        CapacityUnits: 0.5,
      },
    } as GetItemCommandOutput,
    found: true,
  },
};



export const updateItemExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "XYZ789ABC123DEF456GHI012JKL345MN",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Attributes: {
      userId: { S: "user-12345" },
      email: { S: "john.doe@example.com" },
      firstName: { S: "John" },
      lastName: { S: "Smith" },
      age: { N: "32" },
      isActive: { BOOL: true },
      updatedAt: { S: "2024-03-20T14:22:10.000Z" },
    },
    ConsumedCapacity: {
      TableName: "Users",
      CapacityUnits: 1,
    },
  } as UpdateItemCommandOutput,
};



export const deleteItemExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "MNO345PQR678STU901VWX234YZA567BC",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ConsumedCapacity: {
      TableName: "Users",
      CapacityUnits: 1,
    },
  } as DeleteItemCommandOutput,
};





// biome-ignore lint/suspicious/noExplicitAny: Example payload needs flexible typing
export const queryItemsExamplePayload: any = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "DEF456GHI789JKL012MNO345PQR678ST",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Items: [
      {
        userId: "user-12345",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        age: 32,
        isActive: true,
        createdAt: "2024-01-15T10:30:00.000Z",
        preferences: {
          theme: "dark",
          notifications: true,
        },
        tags: ["premium", "verified"],
      },
      {
        userId: "user-67890",
        email: "jane.smith@example.com",
        firstName: "Jane",
        lastName: "Smith",
        age: 28,
        isActive: true,
        createdAt: "2024-02-10T09:15:30.000Z",
        preferences: {
          theme: "light",
          notifications: false,
        },
        tags: ["verified"],
      },
    ],
    Count: 2,
    ScannedCount: 2,
    ConsumedCapacity: {
      TableName: "Users",
      CapacityUnits: 0.5,
    },
  },
};







export const createTableExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "GHI789JKL012MNO345PQR678STU901VW",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    TableDescription: {
      TableName: "Users",
      TableArn: "arn:aws:dynamodb:us-east-1:123456789012:table/Users",
      TableStatus: "CREATING",
      CreationDateTime: new Date("2024-03-20T10:30:00.000Z"),
      AttributeDefinitions: [
        {
          AttributeName: "userId",
          AttributeType: "S",
        },
        {
          AttributeName: "email",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "userId",
          KeyType: "HASH",
        },
      ],
      TableSizeBytes: 0,
      ItemCount: 0,
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
        NumberOfDecreasesToday: 0,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: "EmailIndex",
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
          IndexStatus: "CREATING",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
            NumberOfDecreasesToday: 0,
          },
        },
      ],
    },
  } as CreateTableCommandOutput,
};



export const describeTableExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "JKL012MNO345PQR678STU901VWX234YZ",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Table: {
      TableName: "Users",
      TableArn: "arn:aws:dynamodb:us-east-1:123456789012:table/Users",
      TableStatus: "ACTIVE",
      CreationDateTime: new Date("2024-03-20T10:30:00.000Z"),
      AttributeDefinitions: [
        {
          AttributeName: "userId",
          AttributeType: "S",
        },
        {
          AttributeName: "email",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "userId",
          KeyType: "HASH",
        },
      ],
      TableSizeBytes: 524288,
      ItemCount: 1247,
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
        NumberOfDecreasesToday: 0,
        LastIncreaseDateTime: new Date("2024-03-15T08:00:00.000Z"),
        LastDecreaseDateTime: new Date("2024-03-10T16:30:00.000Z"),
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: "EmailIndex",
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
          IndexStatus: "ACTIVE",
          IndexSizeBytes: 524288,
          ItemCount: 1247,
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
            NumberOfDecreasesToday: 0,
          },
        },
      ],
    },
  } as DescribeTableCommandOutput,
};



export const deleteTableExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "PQR678STU901VWX234YZA567BCD890EF",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    TableDescription: {
      TableName: "Users",
      TableArn: "arn:aws:dynamodb:us-east-1:123456789012:table/Users",
      TableStatus: "DELETING",
      CreationDateTime: new Date("2024-03-20T10:30:00.000Z"),
      AttributeDefinitions: [
        {
          AttributeName: "userId",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "userId",
          KeyType: "HASH",
        },
      ],
      TableSizeBytes: 524288,
      ItemCount: 1247,
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
        NumberOfDecreasesToday: 0,
      },
    },
  } as DeleteTableCommandOutput,
};



export const listTablesExamplePayload = {
  data: {
    result: {
      $metadata: {
        httpStatusCode: 200,
        requestId: "STU901VWX234YZA567BCD890EFG123HI",
        extendedRequestId: undefined,
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0,
      },
      TableNames: ["Users", "Orders", "Products", "Inventory", "Analytics"],
      LastEvaluatedTableName: undefined,
    } as ListTablesCommandOutput,
    found: true,
  },
};







export const rawRequestExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "VWX234YZA567BCD890EFG123HIJ456KL",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Items: [
      {
        userId: { S: "user-12345" },
        email: { S: "john.doe@example.com" },
        firstName: { S: "John" },
        lastName: { S: "Doe" },
      },
      {
        userId: { S: "user-67890" },
        email: { S: "jane.smith@example.com" },
        firstName: { S: "Jane" },
        lastName: { S: "Smith" },
      },
    ],
    NextToken: undefined,
  } as ExecuteStatementCommandOutput,
};
