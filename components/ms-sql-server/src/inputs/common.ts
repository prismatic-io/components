import { input, type KeyValuePair, util } from "@prismatic-io/spectral";

export const queryField = input({
  label: "Query",
  type: "code",
  language: "sql",
  default: "SELECT * FROM Customers WHERE customerId = @id",
  required: true,
  comments:
    "The SQL query to execute against the Microsoft SQL Server database. Supports optional named parameters using the '@variable' operator.",
  clean: util.types.toString,
});

export const params = input({
  label: "Parameters",
  comments:
    "The key-value pairs to bind as named parameters in the query, referenced using the '@variable' operator.",
  type: "data",
  required: false,
  collection: "keyvaluelist",
  clean: (value: unknown) =>
    util.types.keyValPairListToObject(value as KeyValuePair<unknown>[]),
});

export const paramsObject = input({
  label: "Parameters Object",
  comments:
    "The JSON key-value object of named parameters to bind in the query. Values are merged with the Parameters input.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify({ productId: 123, customerName: "Acme Corp" }),
  clean: (value) => (value ? util.types.toObject(value) : {}),
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft SQL Server connection to use.",
});

export const timeout = input({
  label: "Timeout",
  comments:
    "The number of milliseconds to wait for a response from the server. If the timeout expires before the server responds, an error will be thrown.",
  type: "string",
  required: false,
  default: "60000",
  example: "60000",
  placeholder: "Enter timeout in milliseconds",
  clean: util.types.toInt,
});

export const storedProcedure = input({
  label: "Stored Procedure",
  type: "string",
  required: true,
  comments: "The name of the stored procedure to execute.",
  example: "myStoreProcedure",
  placeholder: "Enter stored procedure name",
  clean: util.types.toString,
});
