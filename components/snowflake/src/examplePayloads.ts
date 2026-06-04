









import { ASYNCHRONOUS_BRANCH } from "./constants";


export const executeSqlSynchronousExamplePayload = {
  branch: ASYNCHRONOUS_BRANCH,
  data: {
    code: "090001",
    statementHandle: "01b1e5d3-0606-7c93-0001-4aae0000e506",
    sqlState: "00000",
    message: "Statement executed successfully.",
    createdOn: 1234567890123,
    statementStatusUrl: "/api/v2/statements/01b1e5d3-0606-7c93-0001-4aae0000e506",
    resultSetMetaData: {
      numRows: 2,
      format: "jsonv2",
      rowType: [
        {
          name: "USER_ID",
          database: "MYDB",
          schema: "PUBLIC",
          table: "USERS",
          type: "FIXED",
          scale: 0,
          precision: 38,
          nullable: false,
        },
        {
          name: "USER_NAME",
          database: "MYDB",
          schema: "PUBLIC",
          table: "USERS",
          type: "TEXT",
          length: 16777216,
          nullable: true,
        },
        {
          name: "CREATED_AT",
          database: "MYDB",
          schema: "PUBLIC",
          table: "USERS",
          type: "TIMESTAMP_NTZ",
          scale: 9,
          nullable: true,
        },
      ],
      partitionInfo: [
        {
          rowCount: 2,
          uncompressedSize: 256,
          compressedSize: 128,
        },
      ],
    },
    data: [
      ["1", "john.doe@example.com", "2024-01-15 10:30:00.000"],
      ["2", "jane.smith@example.io", "2024-01-16 14:22:10.000"],
    ],
  },
};



export const executeSqlAsynchronousExamplePayload = {
  data: {
    code: "333334",
    sqlState: "00000",
    message: "Statement executed successfully.",
    statementHandle: "01b1e5d3-0606-7c93-0001-4aae0000e506",
    statementStatusUrl: "/api/v2/statements/01b1e5d3-0606-7c93-0001-4aae0000e506",
  },
};



export const executeSqlMultiStatementExamplePayload = {
  data: {
    code: "333334",
    sqlState: "00000",
    message: "Statement executed successfully.",
    statementHandles: [
      "01b1e5d3-0606-7c93-0001-4aae0000e506",
      "01b1e5d3-0606-7c93-0001-4aae0000e507",
      "01b1e5d3-0606-7c93-0001-4aae0000e508",
    ],
    statementStatusUrl: "/api/v2/statements/01b1e5d3-0606-7c93-0001-4aae0000e506",
  },
};



export const executeSqlPolledResultsExamplePayload = {
  data: [
    {
      code: "090001",
      statementHandle: "01b1e5d3-0606-7c93-0001-4aae0000e506",
      sqlState: "00000",
      message: "Statement executed successfully.",
      createdOn: 1234567890123,
      statementStatusUrl: "/api/v2/statements/01b1e5d3-0606-7c93-0001-4aae0000e506",
      resultSetMetaData: {
        numRows: 1000,
        format: "jsonv2",
        partitionInfo: [
          {
            rowCount: 1000,
            uncompressedSize: 51200,
            compressedSize: 12800,
          },
        ],
      },
      data: [
        ["100", "Large Dataset Row 1", "2024-01-15 10:30:00.000"],
        ["101", "Large Dataset Row 2", "2024-01-15 10:31:00.000"],
      ],
    },
  ],
};


export const getStatementHandleRunningExamplePayload = {
  data: {
    code: "333333",
    sqlState: "00000",
    message: "Query is still running.",
    statementHandle: "01b1e5d3-0606-7c93-0001-4aae0000e506",
  },
};


export const getStatementHandleCompletedExamplePayload = {
  data: {
    code: "090001",
    statementHandle: "01b1e5d3-0606-7c93-0001-4aae0000e506",
    sqlState: "00000",
    message: "Statement executed successfully.",
    createdOn: 1234567890123,
    statementStatusUrl: "/api/v2/statements/01b1e5d3-0606-7c93-0001-4aae0000e506",
    resultSetMetaData: {
      numRows: 500,
      format: "jsonv2",
      rowType: [
        {
          name: "ORDER_ID",
          database: "SALESDB",
          schema: "PUBLIC",
          table: "ORDERS",
          type: "FIXED",
          scale: 0,
          precision: 38,
          nullable: false,
        },
        {
          name: "CUSTOMER_NAME",
          database: "SALESDB",
          schema: "PUBLIC",
          table: "ORDERS",
          type: "TEXT",
          length: 16777216,
          nullable: true,
        },
        {
          name: "ORDER_TOTAL",
          database: "SALESDB",
          schema: "PUBLIC",
          table: "ORDERS",
          type: "FIXED",
          scale: 2,
          precision: 10,
          nullable: true,
        },
        {
          name: "ORDER_DATE",
          database: "SALESDB",
          schema: "PUBLIC",
          table: "ORDERS",
          type: "DATE",
          nullable: true,
        },
      ],
      partitionInfo: [
        {
          rowCount: 500,
          uncompressedSize: 25600,
          compressedSize: 6400,
        },
      ],
    },
    data: [
      ["1001", "Acme Corporation", "15999.99", "2024-01-15"],
      ["1002", "Global Industries", "8750.50", "2024-01-16"],
      ["1003", "Tech Solutions Inc", "23500.00", "2024-01-17"],
    ],
    partition: 0,
  },
};
